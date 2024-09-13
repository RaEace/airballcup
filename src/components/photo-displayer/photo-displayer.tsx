import { FunctionComponent, useEffect, useState } from "react";
import { getImages } from "./import-all-images";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const PhotoDisplayer: FunctionComponent = () => {
  const [images, setImages] = useState<string[]>([]);
  const loadImages = async () => setImages(await getImages());

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div className="">
      <Carousel>
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <img src={src} alt={`photo-${index}-airballcup`} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default PhotoDisplayer;
