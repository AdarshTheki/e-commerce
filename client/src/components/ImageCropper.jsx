import React, { useCallback, useRef, useState } from "react";
import { getCroppedImg } from "../helper/constant";
import Cropper from "react-easy-crop";
import { Download } from "lucide-react";
import { Input } from "../utils";

const ImageCropper = () => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const inputRef = useRef(null);

  const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleClear = () => {
    setImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    inputRef.current = null;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!image || !croppedAreaPixels) return;

    const croppedImage = await getCroppedImg(image, croppedAreaPixels);
    const link = document.createElement("a");
    link.download = "cropped-image.png";
    link.href = croppedImage;
    link.click();
  };

  return (
    <div className="space-y-4">
      <Input
        className="!w-fit"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={inputRef}
      />

      {image && (
        <div className="relative w-full h-[400px] bg-gray-50">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1} // change to your need (e.g., 16/9, 4/3)
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      )}

      {image && (
        <div className="flex space-x-2 items-center">
          <label>Zoom:</label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </div>
      )}

      {image && (
        <div className="flex gap-5 items-center">
          <button
            onClick={handleDownload}
            className="px-4 py-2 flex items-center gap-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            <Download size={22} /> Cropped Image
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 flex items-center gap-2 bg-red-600 text-white rounded hover:bg-red-700">
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
