import { useState, useEffect } from "react";

const useTypewriter = ({ text = "", speed = 100, infinite = false }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!infinite) {
      if (index < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev + text.charAt(index));
          setIndex(index + 1);
        }, speed);
        return () => clearTimeout(timeout);
      }
    } else {
      const timeout = setTimeout(() => {
        if (!isDeleting && index < text.length) {
          setDisplayText((prev) => prev + text.charAt(index));
          setIndex(index + 1);
        } else if (isDeleting && index > 0) {
          setDisplayText((prev) => prev.slice(0, -1));
          setIndex(index - 1);
        } else {
          setIsDeleting(!isDeleting);
        }
      }, speed);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isDeleting, text, speed]);

  return { displayText };
};

export default useTypewriter;
