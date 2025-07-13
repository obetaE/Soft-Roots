"use client";
import styles from "./book-test-drive.module.css";
import { useState } from "react";
import SplineViewer from "@/components/SplineViewer";

const TestDrivePage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    preferredDate: "",
    preferredTime: "",
    model: "Pioneer Edition",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          location: "",
          preferredDate: "",
          preferredTime: "",
          model: "Pioneer Edition",
          message: "",
        });
      }, 5000);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <video
        className={styles.videoBackground}
        src="https://cdn.pixabay.com/video/2024/09/09/230471_tiny.mp4"
        muted
        playsInline
        loop
        autoPlay
      />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>EXPERIENCE LUXURY</h1>
          <p className={styles.heroSubtitle}>
            Book Your Private Test Drive Today
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.contentSection}>
        <div className={styles.contentContainer}>
          {/* Form Section */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Schedule Your Test Drive</h2>
            <p className={styles.sectionSubtitle}>
              Experience the pinnacle of luxury truck engineering firsthand
            </p>

            {submitSuccess ? (
              <div className={styles.successMessage}>
                <h3>Your Test Drive is Confirmed!</h3>
                <p>
                  Thank you for scheduling your test drive. A Soft Roots Luxury
                  Consultant will contact you shortly to confirm details and
                  answer any questions.
                </p>
                <p className={styles.confirmationNumber}>
                  Confirmation #: SR-{Math.floor(Math.random() * 1000000)}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstName">First Name*</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="John"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="lastName">Last Name*</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Doe"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email*</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone*</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="(123) 456-7890"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="location">Preferred Location*</label>
                    <select
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a location</option>
                      <option value="detroit">Detroit, MI</option>
                      <option value="new-york">New York, NY</option>
                      <option value="los-angeles">Los Angeles, CA</option>
                      <option value="chicago">Chicago, IL</option>
                      <option value="miami">Miami, FL</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="model">Model Preference*</label>
                    <select
                      id="model"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      required
                    >
                      <option value="Pioneer Edition">Pioneer Edition</option>
                      <option value="Adventurer Edition">
                        Adventurer Edition
                      </option>
                      <option value="Heritage Limited">Heritage Limited</option>
                      <option value="Executive Package">
                        Executive Package
                      </option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="preferredDate">Preferred Date*</label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="preferredTime">Preferred Time*</label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a time</option>
                      <option value="morning">Morning (9AM-12PM)</option>
                      <option value="afternoon">Afternoon (1PM-4PM)</option>
                      <option value="evening">Evening (5PM-8PM)</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Special Requests</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Any specific requests or questions about the test drive..."
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "BOOK TEST DRIVE"}
                </button>
              </form>
            )}
          </div>

          {/* Spline Model Section */}
          <div className={styles.modelSection}>
            <div className={styles.modelContainer}>
              <SplineViewer scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
              <div className={styles.modelInfo}>
                <h3>Pioneer Edition</h3>
                <p>Experience our flagship luxury truck</p>
                <ul className={styles.featureList}>
                  <li>550HP Twin-Turbo Engine</li>
                  <li>Handcrafted Leather Interior</li>
                  <li>Smart Suspension System</li>
                  <li>Advanced Driver Assistance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Drive Experience */}
      <section className={styles.experienceSection}>
        <div className={styles.experienceContainer}>
          <h2>The Soft Roots Test Drive Experience</h2>
          <div className={styles.experienceGrid}>
            <div className={styles.experienceCard}>
              <div className={styles.experienceIcon}>1</div>
              <h3>Personalized Consultation</h3>
              <p>
                Begin with a private consultation to understand your preferences
                and requirements.
              </p>
            </div>

            <div className={styles.experienceCard}>
              <div className={styles.experienceIcon}>2</div>
              <h3>Vehicle Walkthrough</h3>
              <p>
                Our specialists will showcase the unique features and
                craftsmanship of your selected model.
              </p>
            </div>

            <div className={styles.experienceCard}>
              <div className={styles.experienceIcon}>3</div>
              <h3>Guided Test Drive</h3>
              <p>
                Experience the vehicle's performance on a route tailored to
                demonstrate its capabilities.
              </p>
            </div>

            <div className={styles.experienceCard}>
              <div className={styles.experienceIcon}>4</div>
              <h3>Post-Drive Discussion</h3>
              <p>
                After your drive, we'll answer all your questions with no
                pressure to purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>QUESTIONS BEFORE YOUR TEST DRIVE?</h2>
          <p>Our luxury consultants are ready to help</p>
          <div className={styles.ctaButtons}>
            <button className={`${styles.ctaButton} ${styles.primary}`}>
              CONTACT CONSULTANT
            </button>
            <button className={`${styles.ctaButton} ${styles.secondary}`}>
              CALL NOW: 1-800-SOFTROOTS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestDrivePage;
