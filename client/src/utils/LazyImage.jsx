import React, { useState, useRef, useEffect } from "react";

const LazyImage = ({ src, placeholder, fallback, ...rest }) => {
  const [imgSrc, setImgSrc] = useState(placeholder || "");
  const imgRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    const handleLoad = () => {
      setImgSrc(src);
    };

    img.onload = handleLoad;
    img.onerror = () => fallback && setImgSrc(fallback);

    // Optional: lazy loading with IntersectionObserver
    if (imgRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            handleLoad();
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(imgRef.current);
      return () => observer.disconnect();
    } else {
      // fallback if no IntersectionObserver
      handleLoad();
    }
  }, [src, fallback]);

  return <img ref={imgRef} src={imgSrc || "/placeholder.jpg"} {...rest} />;
};

export default LazyImage;
