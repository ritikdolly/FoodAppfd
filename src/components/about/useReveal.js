import { useEffect, useRef } from "react";

/**
 * Intersection Observer hook for scroll-reveal animations.
 * @param {Object} options
 * @param {"up"|"left"|"right"|"scale"} options.direction - Animation direction
 * @param {number} options.delay - Delay in ms before animation starts
 * @param {number} options.threshold - Intersection threshold (0-1)
 */
export const useReveal = ({
  direction = "up",
  delay = 0,
  threshold = 0.15,
} = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial hidden state based on direction
    el.style.opacity = "0";
    el.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

    switch (direction) {
      case "left":
        el.style.transform = "translateX(-60px)";
        break;
      case "right":
        el.style.transform = "translateX(60px)";
        break;
      case "scale":
        el.style.transform = "scale(0.9)";
        break;
      default: // "up"
        el.style.transform = "translateY(40px)";
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateX(0) translateY(0) scale(1)";
          obs.unobserve(el);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [direction, delay, threshold]);

  return ref;
};
