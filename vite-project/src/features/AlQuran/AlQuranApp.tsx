
import React, { useState, useEffect, useRef } from "react";
import "./AlQuranApp.css";
import { getSurahs, getAyat, Surah, Ayat } from "../../api";

const AlQuranApp = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [currentAyat, setCurrentAyat] = useState<Ayat | null>(null);
  const [currentSurah, setCurrentSurah] = useState<Surah | null>(null);
  const [currentAyahNumber, setCurrentAyahNumber] = useState(1);
  const [direction, setDirection] = useState<"down" | "up" | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchSurahs = async () => {
      const fetchedSurahs = await getSurahs();
      setSurahs(fetchedSurahs);
      setCurrentSurah(fetchedSurahs[0]);
    };
    fetchSurahs();
  }, []);

  useEffect(() => {
    if (currentSurah) {
      const fetchAyat = async () => {
        const fetchedAyat = await getAyat(currentSurah.id, currentAyahNumber);
        setCurrentAyat(fetchedAyat);
      };
      fetchAyat();
    }
  }, [currentSurah, currentAyahNumber]);

  const handleScroll = (e: React.WheelEvent) => {
    if (e.deltaY > 0 && currentSurah && currentAyahNumber < currentSurah.ayahs) {
      setDirection("down");
      setCurrentAyahNumber(currentAyahNumber + 1);
    } else if (e.deltaY < 0 && currentAyahNumber > 1) {
      setDirection("up");
      setCurrentAyahNumber(currentAyahNumber - 1);
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setDirection(null), 400);
  };

  const handleSurahClick = (surah: Surah) => {
    setCurrentSurah(surah);
    setCurrentAyahNumber(1);
  };

  return (
    <div className="alquran-app-container flex h-screen bg-gray-100">
      <div className="surah-list w-1/4 bg-white p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Surahs</h2>
        <input type="text" placeholder="Search Surah" className="w-full p-2 mb-4 border rounded" />
        <ul>
          {surahs.map(surah => (
            <li key={surah.id} onClick={() => handleSurahClick(surah)} className="p-2 border-b cursor-pointer hover:bg-gray-200">
              {surah.name} ({surah.ayahs} ayahs)
            </li>
          ))}
        </ul>
      </div>
      <div
        className="quran-scroll-container w-3/4 h-screen flex flex-col justify-center items-center bg-gradient-to-b from-green-100 to-blue-100 overflow-hidden"
        onWheel={handleScroll}
      >
        {currentAyat ? (
          <>
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
                {currentAyat.surah}{" "}
                <span className="text-base text-red-500">
                  - Ayah {currentAyat.ayah}
                </span>
              </h3>
              <p className="text-3xl text-gray-900 font-serif text-center mb-6">
                {currentAyat.text}
              </p>
            </div>
            <div className="text-center mt-4">
              <span className="text-gray-500">
                {currentAyahNumber} / {currentSurah?.ayahs}
              </span>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AlQuranApp;
