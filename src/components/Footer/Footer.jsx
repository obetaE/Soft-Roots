import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <p>Join Our NewsLetter</p>
        <form className={styles.subscribe}>
          <input type="email" placeholder="Enter your email"></input>
          <button className={styles.button}>Subscribe</button>
        </form>
      </div>
      <div className={styles.bottom}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th>
                
              </th>
              <th>Follow us on our Socials</th>
              <th>Opening Hours</th>
              <th>Quick Links</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            <tr>
              <td className="pr-3">
                <Link href="/" className={styles.links}>
                  <Image
                    src="https://res.cloudinary.com/dudlxsoui/image/upload/v1733071562/Instagram_iccqog.png"
                    alt="Instagram"
                    width={50}
                    height={50}
                  />
                </Link>
              </td>
              <td>
                <div className={styles.socials}>
                  <span>On Instagram @GammaSuite</span>
                </div>
              </td>
              <td>Mondays: 9:00am - 9:00pm</td>
              <td>
                <Link href="/room">Rooms & Suites</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link
                  href="/"
                  className={styles.links}
                >
                  <Image
                    src="https://res.cloudinary.com/dudlxsoui/image/upload/v1733071562/Facebook_hdstbv.png"
                    alt="Facebook"
                    width={30}
                    height={40}
                  />
                </Link>
              </td>
              <td>
                <div className={styles.socials}>
                  <span>On Facebook @GammaSuite</span>
                </div>
              </td>
              <td>Tuesdays: 9:00am - 9:00pm</td>
              <td>
                <Link href="/explore">Explore</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/" className={styles.links}>
                  <Image
                    src="https://res.cloudinary.com/dudlxsoui/image/upload/v1737677762/Untitled_design_5_jvxoou.png"
                    alt="Reservation"
                    width={30}
                    height={30}
                  />
                </Link>
              </td>
              <td>
                <div className={styles.socials}>
                  <span>Make A Reservation @+2348051025661</span>
                </div>
              </td>
              <td>Wednesdays: 9:00am - 9:00pm</td>
              <td>
                <Link href="/gallery">Gallery</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link
                  href="/"
                  className={styles.links}
                >
                  <Image
                    src="https://res.cloudinary.com/dudlxsoui/image/upload/v1733071562/Twitter_nk36mk.png"
                    alt="Twitter"
                    width={30}
                    height={30}
                  />
                </Link>
              </td>
              <td>
                <div className={styles.socials}>
                  <span>On Twitter @GammaSuite</span>
                </div>
              </td>
              <td>Thursdays: 9:00am - 9:00pm</td>
              <td>
                <Link href="/contact">Contact Us</Link>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Fridays: 9:00am - 9:00pm</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Saturdays: 9:00am - 11:00pm</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Sundays: 12:00am - 10:00pm</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Footer;
