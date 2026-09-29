export const productCategories = ["All", "Trucks", "Accessories", "Merchandise"];

export const products = [
  {
    id: "fjord-f100",
    name: "Fjord F-100 Heritage",
    price: 58900,
    category: "Trucks",
    bestSeller: true,
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
    description:
      "The square-body icon, restored in our studio and configurable in 3D",
    buildUrl: "/build",
    features: [
      "Configure paint, wheels and stance in 3D",
      "Studio-restored bodywork",
      "Modern drivetrain options",
    ],
    specs: {
      Engine: "5.0L V8",
      Horsepower: "300 HP",
      Torque: "360 lb-ft",
      Seating: "3",
    },
  },
  {
    id: "voyota-halux",
    name: "Voyota Halux Overland",
    price: 46500,
    category: "Trucks",
    bestSeller: true,
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    description: "Built for the explorer who demands comfort and capability",
    features: [
      "All-Terrain Package",
      "Extended Range Fuel Tank",
      "Heavy-Duty Suspension",
    ],
    specs: {
      Engine: "2.8L Turbo Diesel",
      Horsepower: "201 HP",
      Torque: "369 lb-ft",
      Seating: "5",
    },
  },
  {
    id: "off-road-package",
    name: "Premium Off-Road Package",
    price: 12500,
    category: "Accessories",
    bestSeller: true,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    description:
      "Enhance your truck's capabilities with our premium off-road package",
    features: ["Enhanced suspension", "All-terrain tires", "Underbody protection"],
  },
  {
    id: "interior-upgrade",
    name: "Luxury Interior Upgrade",
    price: 8500,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80",
    description: "Upgrade your cabin with premium materials and comfort features",
    features: [
      "Premium leather seats",
      "Custom wood trim",
      "Heated & ventilated seats",
    ],
  },
  {
    id: "carbon-running-boards",
    name: "Carbon Fiber Running Boards",
    price: 3200,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
    description: "Lightweight and durable running boards for easy access",
    features: [
      "Carbon fiber construction",
      "Anti-slip surface",
      "Integrated lighting",
    ],
  },
  {
    id: "signature-jacket",
    name: "Soft Roots Signature Jacket",
    price: 299,
    category: "Merchandise",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=80",
    description: "Premium jacket featuring Soft Roots branding",
    features: ["Waterproof", "Insulated", "Multiple pockets"],
  },
  {
    id: "limited-model",
    name: "Limited Edition Truck Model",
    price: 199,
    category: "Merchandise",
    image:
      "https://images.unsplash.com/photo-1670069247956-1a6dfee5338e?auto=format&fit=crop&w=1200&q=80",
    description: "1:18 scale die-cast model of the Fjord F-100 Heritage",
    features: [
      "Premium packaging",
      "Display stand",
      "Certificate of authenticity",
    ],
  },
  {
    id: "leather-keychain",
    name: "Soft Roots Leather Keychain",
    price: 89,
    category: "Merchandise",
    image:
      "https://images.unsplash.com/photo-1676276550349-580c49631496?auto=format&fit=crop&w=1200&q=80",
    description: "Handcrafted leather keychain with metal emblem",
    features: ["Genuine leather", "Solid metal emblem", "Lifetime warranty"],
  },
];

export const getProduct = (id) => products.find((p) => p.id === id);

const wholeDollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const withCents = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export const formatPrice = (value, { cents = false } = {}) =>
  (cents ? withCents : wholeDollars).format(value);
