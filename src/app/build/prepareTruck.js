import { Box3, CanvasTexture, Group, Quaternion, Vector3 } from "three";

const TARGET_LENGTH = 4.8;
const X_AXIS = new Vector3(1, 0, 0);
const Y_AXIS = new Vector3(0, 1, 0);
const Z_AXIS = new Vector3(0, 0, 1);

const worldBox = (object) => new Box3().setFromObject(object);
const worldCenter = (object) => worldBox(object).getCenter(new Vector3());

function rotate(object, axis, angle, root) {
  object.quaternion.premultiply(new Quaternion().setFromAxisAngle(axis, angle));
  root.updateMatrixWorld(true);
}

/** Moves a mesh's pivot to the center of its geometry without changing how it looks, so it can scale in place. */
function centerPivot(mesh) {
  mesh.geometry = mesh.geometry.clone();
  mesh.geometry.computeBoundingBox();
  const center = mesh.geometry.boundingBox.getCenter(new Vector3());
  mesh.geometry.translate(-center.x, -center.y, -center.z);
  mesh.position.add(center.multiply(mesh.scale).applyQuaternion(mesh.quaternion));
}

/** A vector in `object`'s parent space that points one world unit up. */
function localUp(object) {
  const origin = object.parent.worldToLocal(new Vector3(0, 0, 0));
  return object.parent.worldToLocal(new Vector3(0, 1, 0)).sub(origin);
}

function collectWorldPoints(object) {
  const points = [];
  object.traverse((child) => {
    if (!child.isMesh) return;
    const position = child.geometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
      points.push(new Vector3().fromBufferAttribute(position, i).applyMatrix4(child.matrixWorld));
    }
  });
  return points;
}

/**
 * Clones the truck scene and normalizes it: Y up, front facing +Z, a fixed length,
 * centered and resting on the ground. Also measures the body so accessories can be placed.
 */
export function prepareTruck(source) {
  const model = source.clone(true);
  const root = new Group();
  root.add(model);

  const body = model.getObjectByName("Pickup");
  const wheels = ["FrontWheel_L", "FrontWheel_R", "BackWheels"].map((name) => model.getObjectByName(name)).filter(Boolean);
  if (!body || wheels.length === 0) throw new Error("Truck model is missing expected parts");

  let atlasMaterial = null;
  let headlightMaterial = null;
  model.traverse((child) => {
    if (!child.isMesh) return;
    if (child.material.name === "Atlas") child.material = atlasMaterial ??= child.material.clone();
    else if (child.material.name === "Headlights") child.material = headlightMaterial ??= child.material.clone();
  });
  if (atlasMaterial) {
    atlasMaterial.roughness = 0.55;
    atlasMaterial.metalness = 0.15;
  }

  wheels.forEach(centerPivot);
  root.updateMatrixWorld(true);

  // A truck's height is its shortest dimension; rotate so that axis is Y.
  let size = worldBox(root).getSize(new Vector3());
  if (size.z < size.y && size.z < size.x) rotate(model, X_AXIS, -Math.PI / 2, root);
  else if (size.x < size.y && size.x < size.z) rotate(model, Z_AXIS, Math.PI / 2, root);
  if (worldCenter(wheels[0]).y > worldCenter(body).y) rotate(model, Z_AXIS, Math.PI, root);

  // Point the length along Z with the front wheels towards +Z.
  size = worldBox(root).getSize(new Vector3());
  if (size.x > size.z) rotate(model, Y_AXIS, Math.PI / 2, root);
  const front = wheels.find((wheel) => /front/i.test(wheel.name));
  const rear = wheels.find((wheel) => /back|rear/i.test(wheel.name));
  if (front && rear && worldCenter(front).z < worldCenter(rear).z) rotate(model, Y_AXIS, Math.PI, root);

  size = worldBox(root).getSize(new Vector3());
  root.scale.setScalar(TARGET_LENGTH / size.z);
  root.updateMatrixWorld(true);
  const box = worldBox(root);
  const center = box.getCenter(new Vector3());
  root.position.set(-center.x, -box.min.y, -center.z);
  root.updateMatrixWorld(true);

  const bodyPoints = collectWorldPoints(body);
  const bodyBox = new Box3().setFromPoints(bodyPoints);
  const roofBand = bodyBox.max.y - (bodyBox.max.y - bodyBox.min.y) * 0.08;
  const roof = new Box3().setFromPoints(bodyPoints.filter((point) => point.y >= roofBand));
  const rearPoints = bodyPoints.filter((point) => point.z < roof.min.z - 0.15);
  const bed = rearPoints.length ? new Box3().setFromPoints(rearPoints) : null;
  const wheelRadius = worldBox(wheels[0]).getSize(new Vector3()).y / 2;

  return {
    object: root,
    atlasMaterial,
    // The untouched atlas, kept so repainting always starts from the original colors.
    atlasMap: atlasMaterial?.map ?? null,
    headlightMaterial,
    body: { node: body, basePosition: body.position.clone(), up: localUp(body) },
    wheels: wheels.map((node) => ({
      node,
      basePosition: node.position.clone(),
      baseScale: node.scale.clone(),
      up: localUp(node),
      radius: worldBox(node).getSize(new Vector3()).y / 2,
    })),
    dimensions: {
      width: bodyBox.max.x - bodyBox.min.x,
      roofY: roof.max.y,
      roofFrontZ: roof.max.z,
      roofWidth: roof.max.x - roof.min.x,
      bedTopY: bed?.max.y ?? null,
      bedFrontZ: roof.min.z,
      bedBackZ: bodyBox.min.z,
      bedWidth: bed ? bed.max.x - bed.min.x : 0,
      wheelRadius,
      frontWheelZ: front ? worldCenter(front).z : bodyBox.max.z - 1,
      rearWheelZ: rear ? worldCenter(rear).z : bodyBox.min.z + 1,
    },
  };
}

/** Applies tire size and suspension lift. Returns how far the body rose, in world units. */
export function applyStance(rig, { tireScale, lift }) {
  const wheelRise = (tireScale - 1) * rig.dimensions.wheelRadius;
  for (const wheel of rig.wheels) {
    wheel.node.scale.copy(wheel.baseScale).multiplyScalar(tireScale);
    wheel.node.position.copy(wheel.basePosition).addScaledVector(wheel.up, wheelRise);
  }
  rig.body.node.position.copy(rig.body.basePosition).addScaledVector(rig.body.up, wheelRise + lift);
  return wheelRise + lift;
}

export function setHeadlights(rig, on) {
  if (!rig.headlightMaterial) return;
  rig.headlightMaterial.emissive.set("#ffe2a8");
  rig.headlightMaterial.emissiveIntensity = on ? 3 : 0;
}

const hexToRgb = (hex) => {
  const value = parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
};

/**
 * Builds an editable copy of a texture atlas without touching any material, so it is safe to
 * call more than once (React Strict Mode double-invokes memo factories in development).
 * `repaint` recolors the given palette swatches, e.g. `{ paint: "#9c2f25" }`.
 */
export function createPaintShop(source, swatches) {
  const { width, height } = source.image;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.drawImage(source.image, 0, 0);
  const original = context.getImageData(0, 0, width, height);

  const texture = new CanvasTexture(canvas);
  texture.flipY = source.flipY;
  texture.colorSpace = source.colorSpace;
  texture.wrapS = source.wrapS;
  texture.wrapT = source.wrapT;
  texture.magFilter = source.magFilter;
  texture.minFilter = source.minFilter;

  const targets = Object.entries(swatches).map(([key, hex]) => [key, hexToRgb(hex)]);

  const repaint = (colors) => {
    const output = new ImageData(new Uint8ClampedArray(original.data), width, height);
    const data = output.data;
    const replacements = targets.filter(([key]) => colors[key]).map(([key, from]) => [from, hexToRgb(colors[key])]);
    for (let i = 0; i < data.length; i += 4) {
      for (const [from, to] of replacements) {
        if (data[i] === from[0] && data[i + 1] === from[1] && data[i + 2] === from[2]) {
          data[i] = to[0];
          data[i + 1] = to[1];
          data[i + 2] = to[2];
          break;
        }
      }
    }
    context.putImageData(output, 0, 0);
    texture.needsUpdate = true;
  };

  return { texture, repaint, dispose: () => texture.dispose() };
}

/** Puts the paint shop's texture on the truck and recolors it. */
export function applyPaint(rig, paintShop, colors) {
  if (!rig.atlasMaterial) return;
  rig.atlasMaterial.map = paintShop.texture;
  paintShop.repaint(colors);
}
