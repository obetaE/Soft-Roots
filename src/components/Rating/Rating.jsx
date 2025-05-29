"use client"
import React, { useState } from "react";
import styles from "./reviews.module.css";


const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "John Doe",
      rating: 4,
      text: "Amazing stay, very comfortable!",
    },
    {
      id: 2,
      user: "Jane Smith",
      rating: 5,
      text: "Loved the view and the service!",
    },
  ]);
  const [error,setError] = useState(false)

  const handleRatingClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = () => {
    if (!reviewText || rating === 0)
      return setError("Please add rating and review");

    const newReview = {
      id: Date.now(),
      user: "Anonymous", // You can replace with logged-in user
      rating,
      text: reviewText,
    };

    setReviews([newReview, ...reviews]);
    setReviewText("");
    setRating(0);
  };

  return (
    <div className={styles.reviewContainer}>
      <h2 className={styles.title}>Leave a Review</h2>

      <div className={styles.rating}>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`${styles.circle} ${
              rating > index ? styles.filled : ""
            }`}
            onClick={() => handleRatingClick(index)}
          ></span>
        ))}
      </div>

      <textarea
        className={styles.textarea}
        placeholder="Share your experience..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />

      {setError && (<p className="text-red-600 mb-2 font-bold px-2">{error}</p>)}

      <button className={styles.button} onClick={handleSubmit}>
        Submit Review
      </button>

      <div className={styles.reviewsList}>
        <h3>What Others Are Saying</h3>
        {reviews.map((rev) => (
          <div key={rev.id} className={styles.reviewItem}>
            <div className={styles.reviewUser}>{rev.user}</div>
            <div className={styles.reviewRating}>
              {[...Array(5)].map((_, idx) => (
                <span
                  key={idx}
                  className={`${styles.circle} ${
                    rev.rating > idx ? styles.filled : ""
                  }`}
                ></span>
              ))}
            </div>
            <p className={styles.reviewText}>{rev.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
