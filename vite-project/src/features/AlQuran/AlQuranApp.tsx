import React, { useState, useRef } from "react";
import "./AlQuranApp.css";

const dummyAyat = [
  {
    surah: "Al-Fatihah",
    ayah: 1,
    text: "In the name of Allah, the Most Gracious, the Most Merciful.",
  },
  {
    surah: "Al-Fatihah",
    ayah: 2,
    text: "All praise is due to Allah, Lord of the worlds.",
  },
  {
    surah: "Al-Fatihah",
    ayah: 3,
    text: "The Most Gracious, the Most Merciful.",
  },
  // Add more dummy ayat for scrolling
];

const AlQuranApp = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"down" | "up" | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleScroll = (e: React.WheelEvent) => {
    if (e.deltaY > 0 && current < dummyAyat.length - 1) {
      setDirection("down");
      setCurrent(current + 1);
    } else if (e.deltaY < 0 && current > 0) {
      setDirection("up");
      setCurrent(current - 1);
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setDirection(null), 400);
  };

  return (
    <div
      className="quran-scroll-container w-full h-screen max-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-green-100 to-blue-100 overflow-hidden bg-red-500"
      onWheel={handleScroll}
    >
      <div
        className={`quran-page transition-transform duration-400 ${
          direction === "down"
            ? "animate-slideDown"
            : direction === "up"
            ? "animate-slideUp"
            : ""
        } w-full max-w-md bg-white shadow-lg rounded-2xl p-8 flex flex-col justify-center items-center`}
        style={{ minHeight: "60vh", maxHeight: "60vh", overflow: "hidden" }}
      >
        <h3 className="text-2xl font-bold text-green-700 mb-4">
          {dummyAyat[current].surah}{" "}
          <span className="text-base text-red-500">
            - Ayah {dummyAyat[current].ayah}
          </span>
        </h3>
        <p className="text-3xl text-gray-900 font-serif text-center mb-6">
          {dummyAyat[current].text}
        </p>
      </div>
      <div className="text-center mt-4">
        <span className="text-gray-500">
          {current + 1} / {dummyAyat.length}
        </span>
      </div>
    </div>
  );
};

export default AlQuranApp;
