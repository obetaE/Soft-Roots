export const trucks = [
  {
    id: "fjord-f100",
    brand: "Fjord",
    model: "F-100 Heritage",
    tagline: "A square-body legend, restored and re-engineered",
    basePrice: 58900,
    modelUrl: "/models/fjord-f100.glb",
    // Flat palette colors in the model's texture atlas that the configurator repaints.
    swatches: { paint: "#4e8aac", accent: "#adadad", rim: "#7a7a7a" },
    baseSpecs: { drivetrain: "Rear-wheel drive", clearance: 8.7 },
    groups: [
      {
        id: "paint",
        label: "Paint",
        type: "swatch",
        choices: [
          { id: "heritage-blue", label: "Heritage Blue", hex: "#4e8aac", price: 0 },
          { id: "glacier-white", label: "Glacier White", hex: "#e9ecef", price: 0 },
          { id: "obsidian-black", label: "Obsidian Black", hex: "#17181c", price: 900 },
          { id: "canyon-red", label: "Canyon Red", hex: "#9c2f25", price: 900 },
          { id: "forest-green", label: "Forest Green", hex: "#2f4b3b", price: 900 },
          { id: "gunmetal-gray", label: "Gunmetal Gray", hex: "#4a5057", price: 900 },
          { id: "desert-sand", label: "Desert Sand", hex: "#c4a57a", price: 600 },
          { id: "soft-roots-gold", label: "Soft Roots Gold", hex: "#d4a72c", price: 1500 },
        ],
      },
      {
        id: "accent",
        label: "Two-Tone Accent",
        type: "swatch",
        choices: [
          { id: "brushed-silver", label: "Brushed Silver", hex: "#adadad", price: 0 },
          { id: "match", label: "Match Body Color", hex: null, price: 450 },
          { id: "vintage-cream", label: "Vintage Cream", hex: "#efe4c8", price: 350 },
          { id: "satin-black", label: "Satin Black", hex: "#1e1e20", price: 350 },
        ],
      },
      {
        id: "wheels",
        label: "Wheel Finish",
        type: "swatch",
        choices: [
          { id: "brushed-steel", label: "Brushed Steel", hex: "#7a7a7a", price: 0 },
          { id: "gloss-black", label: "Gloss Black", hex: "#1d1d1f", price: 750 },
          { id: "satin-bronze", label: "Satin Bronze", hex: "#8c6a3f", price: 950 },
          { id: "polished-gold", label: "Polished Gold", hex: "#c9a227", price: 1250 },
        ],
      },
      {
        id: "stance",
        label: "Suspension & Tires",
        type: "cards",
        choices: [
          {
            id: "street",
            label: "Street",
            description: "Factory ride height with quiet touring tires.",
            price: 0,
            tireScale: 1,
            lift: 0,
            clearance: 0,
          },
          {
            id: "all-terrain",
            label: "All-Terrain",
            description: "Larger all-terrain tires with a 1-inch leveling kit.",
            price: 2400,
            tireScale: 1.1,
            lift: 0.06,
            clearance: 1.5,
          },
          {
            id: "trail",
            label: "Trail Lift Kit",
            description: "3-inch lift, 35-inch tires and remote-reservoir shocks.",
            price: 5800,
            tireScale: 1.2,
            lift: 0.2,
            clearance: 3.5,
          },
        ],
      },
      {
        id: "engine",
        label: "Powertrain",
        type: "cards",
        choices: [
          {
            id: "v8",
            label: "5.0L V8",
            description: "Naturally aspirated with a 10-speed automatic.",
            price: 0,
            specs: { power: 300, torque: 360, zeroToSixty: 6.9, towing: 8000 },
          },
          {
            id: "twin-turbo-v6",
            label: "3.5L Twin-Turbo V6",
            description: "More torque and better economy for long hauls.",
            price: 4500,
            specs: { power: 400, torque: 500, zeroToSixty: 5.6, towing: 11000 },
          },
          {
            id: "electric",
            label: "Dual-Motor Electric",
            description: "Instant torque, all-wheel drive and a 320-mile estimated range.",
            price: 12900,
            specs: { power: 580, torque: 775, zeroToSixty: 4.1, towing: 10000, range: 320, drivetrain: "All-wheel drive" },
          },
        ],
      },
      {
        id: "interior",
        label: "Interior",
        type: "cards",
        choices: [
          { id: "plaid-cloth", label: "Heritage Plaid Cloth", description: "Woven bench seat with retro stitching.", price: 0 },
          { id: "saddle-leather", label: "Saddle Leather", description: "Hand-stitched tan leather with brass accents.", price: 2200 },
          { id: "nappa-leather", label: "Black Nappa Leather", description: "Heated and ventilated seats with gold piping.", price: 3100 },
        ],
      },
      {
        id: "accessories",
        label: "Accessories",
        type: "multi",
        choices: [
          { id: "light-bar", label: "LED Roof Light Bar", description: "A 40-inch light bar for nights on the trail.", price: 1150 },
          { id: "bed-cover", label: "Hard Tonneau Cover", description: "Lockable cover that keeps cargo dry and secure.", price: 1450 },
          { id: "running-boards", label: "Running Boards", description: "Powder-coated steps for easier entry.", price: 890 },
        ],
      },
    ],
  },
];

export const getTruck = (id) => trucks.find((truck) => truck.id === id);

const getGroup = (truck, groupId) => truck.groups.find((group) => group.id === groupId);

const selectedIds = (group, config) => (group.type === "multi" ? config[group.id] : [config[group.id]]);

const getChoice = (truck, config, groupId) => {
  const group = getGroup(truck, groupId);
  return group.choices.find((choice) => choice.id === config[groupId]);
};

export function defaultConfig(truck) {
  return Object.fromEntries(truck.groups.map((group) => [group.id, group.type === "multi" ? [] : group.choices[0].id]));
}

/** Keeps only known option ids, so URLs and saved carts can never produce an invalid build or price. */
export function sanitizeConfig(truck, raw = {}) {
  const config = defaultConfig(truck);
  for (const group of truck.groups) {
    const valid = new Set(group.choices.map((choice) => choice.id));
    const value = raw?.[group.id];
    if (group.type === "multi") {
      const list = Array.isArray(value) ? value : typeof value === "string" ? value.split(",") : [];
      config[group.id] = [...new Set(list.filter((id) => valid.has(id)))].sort();
    } else if (valid.has(value)) {
      config[group.id] = value;
    }
  }
  return config;
}

export const configFromSearchParams = (truck, params) =>
  sanitizeConfig(truck, Object.fromEntries(truck.groups.map((group) => [group.id, params.get(group.id) ?? undefined])));

export function configToQuery(truck, config) {
  const params = new URLSearchParams();
  for (const group of truck.groups) {
    const ids = selectedIds(group, config);
    if (ids.length) params.set(group.id, ids.join(","));
  }
  return params.toString();
}

export const buildId = (truck, config) => `build:${truck.id}:${configToQuery(truck, config)}`;

export function priceBuild(truck, config) {
  const lines = [{ label: `${truck.brand} ${truck.model}`, price: truck.basePrice }];
  for (const group of truck.groups) {
    for (const id of selectedIds(group, config)) {
      const choice = group.choices.find((option) => option.id === id);
      if (choice) lines.push({ label: `${group.label}: ${choice.label}`, price: choice.price });
    }
  }
  return { lines, total: lines.reduce((sum, line) => sum + line.price, 0) };
}

/** Everything the 3D scene needs to render a configuration. */
export function buildLook(truck, config) {
  const paint = getChoice(truck, config, "paint").hex;
  const stance = getChoice(truck, config, "stance");
  return {
    paint,
    accent: getChoice(truck, config, "accent").hex ?? paint,
    rim: getChoice(truck, config, "wheels").hex,
    stance: { tireScale: stance.tireScale, lift: stance.lift },
    lightBar: config.accessories.includes("light-bar"),
    bedCover: config.accessories.includes("bed-cover"),
    runningBoards: config.accessories.includes("running-boards"),
  };
}

export function getSpecs(truck, config) {
  const engine = getChoice(truck, config, "engine").specs;
  const stance = getChoice(truck, config, "stance");
  return [
    { label: "Horsepower", value: `${engine.power} hp` },
    { label: "Torque", value: `${engine.torque} lb-ft` },
    { label: "0–60 mph", value: `${engine.zeroToSixty} s` },
    { label: "Towing", value: `${engine.towing.toLocaleString("en-US")} lbs` },
    { label: "Ground Clearance", value: `${(truck.baseSpecs.clearance + stance.clearance).toFixed(1)} in` },
    engine.range
      ? { label: "Range", value: `${engine.range} mi` }
      : { label: "Drivetrain", value: engine.drivetrain ?? truck.baseSpecs.drivetrain },
  ];
}

/** Cart-friendly description of a saved build. */
export function describeBuild(truck, config) {
  const look = buildLook(truck, config);
  const features = truck.groups.flatMap((group) =>
    selectedIds(group, config)
      .map((id) => group.choices.find((choice) => choice.id === id))
      .filter(Boolean)
      .map((choice) => `${group.label}: ${choice.label}`)
  );
  return {
    id: buildId(truck, config),
    name: `${truck.brand} ${truck.model}`,
    category: "Custom Build",
    price: priceBuild(truck, config).total,
    features,
    swatch: { paint: look.paint, accent: look.accent },
    href: `/build?${configToQuery(truck, config)}`,
  };
}
