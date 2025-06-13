import { ImageGallery, ImageUpload } from "../components";

const Gallery = () => {
  return (
    <div className="max-w-6xl mx-auto min-h-screen p-3">
      <h1 className="text-2xl font-semibold py-6">Gallery</h1>
      <ImageUpload />
      <ImageGallery />
    </div>
  );
};

export default Gallery;
