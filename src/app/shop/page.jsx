import React from 'react'
import styles from "./room.module.css"
import Image from "next/image"
import Link from "next/link"

const roomsAndSuites = [
  {
    index: 1,
    name: "Single Room",
    tagline: "Cozy, perfect for solo travelers",
    description: "A comfortable space designed for solo guests seeking tranquility and modern convenience. Enjoy a peaceful stay with all the essentials at your fingertips.",
    image: "/landing.jpg",
    amenities: [
      "Free Wi-Fi",
      "Flat-screen TV",
      "Air Conditioning",
      "Work Desk",
      "Private Bathroom"
    ]
  },
  {
    index: 2,
    name: "Double Room",
    tagline: "Ideal for couples, with city views",
    description: "Spacious and stylish, our Double Rooms are ideal for couples. Unwind with stunning city views, plush bedding, and contemporary décor.",
    image: "/landing.jpg",
    amenities: [
      "Free Wi-Fi",
      "City View",
      "Queen Bed",
      "Mini Fridge",
      "Complimentary Breakfast"
    ]
  },
  {
    index: 3,
    name: "Deluxe Room",
    tagline: "Extra space, premium amenities",
    description: "Upgrade your stay with our Deluxe Rooms featuring additional space, upscale furnishings, and enhanced amenities for a truly relaxing experience.",
    image: "/landing.jpg",
    amenities: [
      "Free Wi-Fi",
      "King Bed",
      "Luxury Linens",
      "Coffee Maker",
      "Bathrobe & Slippers"
    ]
  },
  {
    index: 4,
    name: "Junior Suite",
    tagline: "Lounge area, modern design",
    description: "Perfect for extended stays or added comfort, our Junior Suites include a separate lounge area with modern design elements and luxurious touches.",
    image: "/landing.jpg",
    amenities: [
      "Separate Living Area",
      "King Bed",
      "2 Smart TVs",
      "Mini Bar",
      "Room Service"
    ]
  },
  {
    index: 5,
    name: "Executive Suite",
    tagline: "Business luxury, smart amenities",
    description: "Designed for business travelers, the Executive Suite combines productivity with relaxation. Enjoy smart amenities, a workspace, and high-speed connectivity.",
    image: "/landing.jpg",
    amenities: [
      "Dedicated Workspace",
      "High-Speed Internet",
      "Conference Call Setup",
      "Complimentary Breakfast",
      "Iron & Ironing Board"
    ]
  },
  {
    index: 6,
    name: "Presidential Suite",
    tagline: "VIP experience, top-tier living",
    description: "Indulge in unparalleled luxury with our Presidential Suite. This expansive space features elegant interiors, private services, and breathtaking cityscape views.",
    image: "/landing.jpg",
    amenities: [
      "Private Butler",
      "Personalized Services",
      "Jacuzzi",
      "Private Balcony",
      "Premium Entertainment System"
    ]
  },
  {
    index: 7,
    name: "Penthouse Suite",
    tagline: "Panoramic views, ultimate luxury",
    description: "Our Penthouse Suite offers a lavish experience with panoramic skyline views, a private terrace, and exquisite furnishings for those who demand the best.",
    image: "/landing.jpg",
    amenities: [
      "Private Terrace",
      "Panoramic City Views",
      "Exclusive Elevator Access",
      "Spa Bath",
      "Gourmet Kitchenette"
    ]
  },
  {
    index: 8,
    name: "Family Suite",
    tagline: "Spacious, family-friendly features",
    description: "Ideal for family getaways, these suites offer ample space, multiple sleeping arrangements, and kid-friendly amenities for a comfortable stay.",
    image: "/landing.jpg",
    amenities: [
      "Multiple Beds",
      "Kids' Play Area",
      "Childproof Rooms",
      "Board Games",
      "Baby Cot (on request)"
    ]
  },
  {
    index: 9,
    name: "Neon Nights Suite",
    tagline: "Nightlife vibe, neon lighting, party feel",
    description: "Immerse yourself in the vibrant nightlife energy of our Neon Nights Suite. Featuring bold neon lighting and a lively ambiance, it's perfect for party enthusiasts.",
    image: "/landing.jpg",
    amenities: [
      "Neon Light Decor",
      "Sound System",
      "Party Area",
      "Mood Lighting Control",
      "Mini Bar"
    ]
  },
  {
    index: 10,
    name: "Accessible Room",
    tagline: "Wheelchair accessible, convenient layout",
    description: "Thoughtfully designed for accessibility, these rooms offer convenience, spacious layouts, and mobility-friendly amenities without compromising on comfort.",
    image: "/landing.jpg",
    amenities: [
      "Wheelchair Access",
      "Roll-in Shower",
      "Grab Bars in Bathroom",
      "Lowered Light Switches",
      "Accessible Bed Height"
    ]
  }
];


const Room = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        Rooms & Suites
        <span>"Enjoy the best of Luxury and Comfort"</span>
      </div>

      <div className={styles.body}>
        {roomsAndSuites.map((room, idx) => (
          <div
            key={room.index}
            className={`${styles.card} ${idx % 2 !== 0 ? styles.reverse : ""}`}
          >
            {/* Image Container */}
            <div className={styles.cardimage}>
              <Image
                src={room.image}
                className={styles.img}
                fill
                alt={room.name}
              />
            </div>

            {/* Card Content */}
            <div className={styles.cardbody}>
              <div className={styles.review}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <span>13 reviews</span>
              </div>

              <div className={styles.cardhead}>
                <h2 className={styles.cardtitle}>{room.name}</h2>
                <p>{`"${room.tagline}"`}</p>
              </div>

              <div className={styles.details}>
                <div className={styles.detstatus}>
                  <span className={styles.status}>STATUS:</span>{" "}
                  <span className={styles.available}>Available</span>
                </div>

                <p className={styles.pernight}>
                  Starts from <span className={styles.price}>$234</span>
                  <span className={styles.night}>/PER NIGHT</span>
                </p>
              </div>

              <div className={styles.cardactions}>
                <Link href={`/room/${room.index}`} className={styles.btn}>
                  VIEW ROOM
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
