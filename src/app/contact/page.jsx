import React from 'react'
import styles from "./contact.module.css"
import Image from "next/image";

const ContactPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contact}>
        <div className={styles.bg}>
          <Image
            src="/contact.jpeg"
            className={styles.img}
            alt="Contact Background"
            fill
          />
        </div>
        <h1>Get in Touch with Us</h1>
        <h2>For Further Info & Services</h2>
        <div className={styles.center}>
          <form className={styles.form}>
            <div className={styles.top}>
              <div>
                <label htmlFor="name">FirstName:</label>
                <input
                  className={styles.input}
                  placeholder="Name"
                  id="name"
                  type="text"
                ></input>
              </div>
              <div>
                <label htmlFor="surname">SurName:</label>
                <input
                  className={styles.input}
                  placeholder="Surname"
                  id="surname"
                  type="text"
                ></input>
              </div>
            </div>
            <div className={styles.bottom}>
              <div>
                <label htmlFor="email">Email-id:</label>
                <input
                  className={styles.input}
                  placeholder="Email"
                  id="email"
                  type="email"
                ></input>
              </div>
              <div>
                <label htmlFor="tel">Mobile No:</label>
                <input
                  className={styles.input}
                  placeholder="Mol-No"
                  id="tel"
                  type="tel"
                ></input>
              </div>
            </div>

            <textarea
              placeholder="Type your message..."
              rows="7"
              cols="10"
              className={styles.textarea}
            ></textarea>
            <button type="submit" className={styles.button}>
              Submit
            </button>
          </form>
        </div>
      </div>
      {/* <div className={}>
        Locate Us
      </div> */}
    </div>
  );
}

export default ContactPage