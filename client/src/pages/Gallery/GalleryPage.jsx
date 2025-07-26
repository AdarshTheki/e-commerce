import ImageGallery from "./ImageGallery";
import ImageUpload from "./ImageUpload";

const Gallery = () => {
  return (
    <div className="max-w-6xl mx-auto min-h-screen p-3">
      <ImageUpload />
      <ImageGallery />
    </div>
  );
};

export default Gallery;
