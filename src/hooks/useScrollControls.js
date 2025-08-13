// hooks/useScrollControls.js
import { useRef } from "react";

export const useScrollControls = (scrollAmount = 900) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return { scrollRef, scrollLeft, scrollRight };
};

