import { FunctionComponent, useEffect, useState } from "react";

// Function to dynamically import images using Vite's import.meta.glob
const importAllImages = () => {
  const images = import.meta.glob("../../assets/photos/photo-*-airballcup.*");
  return Object.keys(images).map((key) => images[key]);
};

const PhotoDisplayer: FunctionComponent = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const imageModules = importAllImages();
      const imageUrls = await Promise.all(
        imageModules.map(async (module) => {
          const mod = await module();
          return (mod as { default: string }).default;
        })
      );
      setImages(imageUrls);
    };

    loadImages();
  }, []);

  return (
    <div className="flex flex-row">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`photo-${index}-airballcup`}
          className="mb-4"
        />
      ))}
    </div>
  );
};

export default PhotoDisplayer;
