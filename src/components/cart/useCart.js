"use client";
import { useMemo, useSyncExternalStore } from "react";
import { buildId, describeBuild, getTruck, sanitizeConfig } from "@/libs/configurator";
import { getProduct } from "@/libs/products";

export const MAX_QUANTITY = 10;

const STORAGE_KEY = "softroots-cart";
const EMPTY = [];
const listeners = new Set();
let snapshot = null;

const clamp = (quantity) => Math.min(Math.max(quantity, 1), MAX_QUANTITY);

// Stored data is user-editable: keep only real products and valid builds, and never trust stored prices.
function sanitizeEntry(entry) {
  if (!entry || !Number.isInteger(entry.quantity) || entry.quantity < 1) return null;
  const quantity = clamp(entry.quantity);
  if (entry.build) {
    const truck = getTruck(entry.build.truckId);
    if (!truck) return null;
    const config = sanitizeConfig(truck, entry.build.config);
    return { id: buildId(truck, config), quantity, build: { truckId: truck.id, config } };
  }
  return getProduct(entry.id) ? { id: entry.id, quantity } : null;
}

function sanitize(value) {
  if (!Array.isArray(value)) return EMPTY;
  const merged = new Map();
  for (const entry of value.map(sanitizeEntry).filter(Boolean)) {
    const existing = merged.get(entry.id);
    merged.set(entry.id, existing ? { ...existing, quantity: clamp(existing.quantity + entry.quantity) } : entry);
  }
  return [...merged.values()];
}

function resolveEntry(entry) {
  if (entry.build) {
    const truck = getTruck(entry.build.truckId);
    return { ...describeBuild(truck, entry.build.config), build: entry.build, quantity: entry.quantity };
  }
  return { ...getProduct(entry.id), quantity: entry.quantity };
}

function getSnapshot() {
  if (snapshot === null) {
    try {
      snapshot = sanitize(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    } catch {
      snapshot = EMPTY;
    }
  }
  return snapshot;
}

function subscribe(listener) {
  listeners.add(listener);
  // Keep multiple open tabs in sync.
  const handleStorage = (event) => {
    if (event.key !== STORAGE_KEY) return;
    snapshot = null;
    listener();
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function updateCart(update) {
  snapshot = update(getSnapshot());
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Storage can be unavailable (private mode, quota); the in-memory cart still works.
  }
  listeners.forEach((listener) => listener());
}

const addEntry = (items, entry) => {
  const existing = items.find((item) => item.id === entry.id);
  return existing
    ? items.map((item) => (item.id === entry.id ? { ...item, quantity: clamp(item.quantity + entry.quantity) } : item))
    : [...items, entry];
};

const actions = {
  addItem: (id, quantity = 1) =>
    updateCart((items) => (getProduct(id) ? addEntry(items, { id, quantity: clamp(quantity) }) : items)),
  addBuild: (truckId, config) =>
    updateCart((items) => {
      const truck = getTruck(truckId);
      if (!truck) return items;
      const clean = sanitizeConfig(truck, config);
      return addEntry(items, { id: buildId(truck, clean), quantity: 1, build: { truckId, config: clean } });
    }),
  setQuantity: (id, quantity) =>
    updateCart((items) => items.map((item) => (item.id === id ? { ...item, quantity: clamp(quantity) } : item))),
  removeItem: (id) => updateCart((items) => items.filter((item) => item.id !== id)),
  clearCart: () => updateCart(() => EMPTY),
};

const subscribeNoop = () => () => {};

export function useCart() {
  const entries = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
  // False during SSR and hydration, so pages can avoid flashing an empty cart.
  const ready = useSyncExternalStore(subscribeNoop, () => true, () => false);

  return useMemo(() => {
    const items = entries.map(resolveEntry);
    return {
      ready,
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      getQuantity: (id) => entries.find((entry) => entry.id === id)?.quantity ?? 0,
      ...actions,
    };
  }, [entries, ready]);
}
