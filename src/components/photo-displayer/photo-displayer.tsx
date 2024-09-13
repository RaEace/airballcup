import { FunctionComponent, useEffect, useState } from "react";
import { getImages } from "./import-all-images";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";

const PhotoDisplayer: FunctionComponent = () => {
  const [images, setImages] = useState<string[]>([]);
  const loadImages = async () => setImages(await getImages());

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div className="pb-">
      <Carousel>
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <img src={src} alt={`photo-${index}-airballcup`} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default PhotoDisplayer;
