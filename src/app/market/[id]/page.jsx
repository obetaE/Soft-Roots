import React from 'react'
import styles from "./sroom.module.css"
import Image from "next/image"
import Rating from "@/components/Rating/Rating"
import Link from "next/link"

const singleRoom = async ({params}) => {
    const { id } = await params;
  return (
    <div className={styles.container}>
      <Link href="/room" className={styles.back}>
        <Image
          src="/Back Button.png"
          alt="Back Button"
          width={20}
          height={20}
        />
        Back
      </Link>
      <div className={styles.card}>
        <div className={styles.cardimage}>
          <Image
            src="/landing.jpg"
            className={styles.img}
            fill
            alt="Single Room"
          />
        </div>
        <div className={styles.cardbody}>
          <div className={styles.cardhead}>
            <div className={styles.top}>
              <h2 className={styles.cardtitle}>Single Room</h2>
              <div className={styles.review}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <span>13 reviews</span>
              </div>
            </div>

            <p>"Cozy, perfect for solo travelers"</p>
            <p className={styles.desc}>
              "A comfortable space designed for solo guests seeking tranquility
              and modern convenience. Enjoy a peaceful stay with all the
              essentials at your fingertips."
            </p>
            <p className={styles.amenities}>
              Free Wi-Fi || Flat-screen TV || Air Conditioning || Work Desk ||
              Private Bathroom
            </p>
          </div>
          <div className={styles.details}>
            <p className={styles.pernight}>
              Starts from <span className={styles.price}>$234</span>
              <span className={styles.night}>/PER NIGHT</span>
            </p>
          </div>
          <div className={styles.cardactions}>
            <div className={styles.detstatus}>
              <span className={styles.status}>STATUS:</span>{" "}
              <span className={styles.available}>Available</span>
            </div>
            <button className={styles.btn}>BOOK NOW</button>
          </div>
        </div>
      </div>
      <Rating />
    </div>
  );
}

export default singleRoom