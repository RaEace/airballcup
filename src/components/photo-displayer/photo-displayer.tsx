import {FunctionComponent, useEffect, useState} from "react";
import {getImages} from "./import-all-images";
import Marquee from "react-fast-marquee";

const PhotoDisplayer: FunctionComponent<{
  speed: number;
  direction: "left" | "right" | "up" | "down";
}> = ({ speed, direction }) => {
  const [images, setImages] = useState<string[]>([]);
  const loadImages = async () => setImages(await getImages());

  useEffect(() => {
    void loadImages();
  }, []);

  return (
    <Marquee speed={speed} direction={direction} className={"w-full flex items-center justify-start"}>
      {images.length > 0 && images.map((img, index) => (
          <img className={"max-h-[288px] sm:max-h-[500px]"} src={img} alt={`gallery picture ${index}`}/>
      ))}
    </Marquee>
  );
};

export default PhotoDisplayer;
