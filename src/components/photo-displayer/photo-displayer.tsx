import {FunctionComponent} from "react";
import Marquee from "react-fast-marquee";


const PhotoDisplayer: FunctionComponent<{
    speed: number;
    images: string[];
}> = ({speed, images}) => {

    function InternalMarquee({direction}:{direction: "left" | "right"}) {
        return <Marquee key={`marquee-${direction}`} speed={speed} direction={direction} className={"w-full flex items-center justify-start"}>
            {images.length > 0 && images.map((img, index) => (
                <img key={`image-${direction}-${index}`} className={"max-h-[288px] sm:max-h-[500px]"} src={img} alt={`gallery picture ${index}`}/>
            ))}
        </Marquee>;
    }

    return (
        <div className={"w-full"}>
            <InternalMarquee direction={"left"} />
            <InternalMarquee direction={"right"} />
        </div>
    );
};

export default PhotoDisplayer;
