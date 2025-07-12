'use client'

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-4 bottom-8 z-50 bg-orange-500 text-white rounded-full shadow-lg p-3 md:right-8 md:bottom-12 hover:bg-orange-600 transition"
      aria-label="回到顶部"
    >
      ↑
    </button>
  );
} 