import { useReveal } from "./useReveal";

/**
 * Section wrapper that animates in when scrolled into view.
 * @param {"up"|"left"|"right"|"scale"} direction - Animation direction
 * @param {number} delay - Delay in ms
 */
export const RevealSection = ({
  children,
  className = "",
  direction = "up",
  delay = 0,
}) => {
  const ref = useReveal({ direction, delay });
  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
};
