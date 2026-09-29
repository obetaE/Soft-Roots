export const site = {
  name: "Soft Roots",
  tagline: "Luxury Trucks Redefined",
  description:
    "Soft Roots is a luxury truck dealership: curated trucks, customized in our own studio, and configurable in 3D.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  phone: {
    display: "1-800-SOFTROOTS",
    numeric: "+1 (800) 763-8766",
    href: "tel:+18007638766",
  },
  email: {
    info: "info@softroots.com",
    support: "support@softroots.com",
  },
  address: {
    street: "123 Luxury Avenue",
    city: "Detroit, MI 48226",
    country: "United States",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=123+Luxury+Avenue+Detroit+MI+48226",
  },
  hours: [
    { days: "Monday – Friday", time: "9:00am – 9:00pm" },
    { days: "Saturday", time: "10:00am – 6:00pm" },
    { days: "Sunday", time: "By appointment" },
  ],
};

export const navLinks = [
  { path: "/", title: "Home" },
  { path: "/about", title: "About Us" },
  { path: "/shop", title: "Shop" },
  { path: "/blog", title: "Blog" },
  { path: "/contact", title: "Contact" },
];

export const heroVideo = {
  src: "/media/hero.mp4",
  poster: "/media/hero-poster.jpg",
};
