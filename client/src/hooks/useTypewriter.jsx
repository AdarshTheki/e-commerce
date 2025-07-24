import { useState, useEffect } from "react";

const useTypewriter = ({ text = "", speed = 100 }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
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
  }, [index, isDeleting, text, speed]);

  return { displayText };
};

export default useTypewriter;
