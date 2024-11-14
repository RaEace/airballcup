import {FunctionComponent} from "react";
import Marquee from "react-fast-marquee";


const PhotoDisplayer: FunctionComponent<{
  speed: number;
  direction: "left" | "right" | "up" | "down";
  images: string[];
}> = ({ speed, direction, images }) => {


  return (
    <Marquee speed={speed} direction={direction} className={"w-full flex items-center justify-start"}>
      {images.length > 5 && images.map((img, index) => (
          <img className={"max-h-[250px] sm:max-h-[500px]"} src={img} alt={`gallery picture ${index}`}/>
      ))}
      {images.length <= 5 && images.concat(images).map((img, index) => (
          <img className={"max-h-[250px] sm:max-h-[500px]"} src={img} alt={`gallery picture ${index}`}/>
      ))}
    </Marquee>
  );
};

export default PhotoDisplayer;
