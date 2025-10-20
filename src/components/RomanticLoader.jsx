import React, { useEffect, useState } from "react";
import "./RomanticLoader.css";

const RomanticLoader = () => {
  const phrases = [
    "holding you",
    "thinking of you",
    "dreaming together",
    "sending love",
    "near your heart"
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [dots, setDots] = useState("•");

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 2200);
    return () => clearInterval(phraseInterval);
  }, []);

  useEffect(() => {
    let count = 0;
    const dotInterval = setInterval(() => {
      count = (count + 1) % 4;
      setDots("•".repeat(count) || "•");
    }, 420);
    return () => clearInterval(dotInterval);
  }, []);

  return (
    <div className="loader-stage">
      <div className="heart-wrap" aria-hidden="true">
        <div className="big-heart"></div>
        <div className="small-heart h-1"></div>
        <div className="small-heart h-2"></div>
        <div className="small-heart h-3"></div>
      </div>

      <div className="loading-text" role="status" aria-live="polite">
        <span id="love-word">{phrases[phraseIndex]}</span>
        <span id="dots">{dots}</span>
      </div>
    </div>
  );
};

export default RomanticLoader;