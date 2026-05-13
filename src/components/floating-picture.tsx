import {CSSProperties, FunctionComponent} from "react";
import Image, {StaticImageData} from "next/image";
import {cn} from "@/lib/utils.ts";

interface FloatingPictureProps {
    floatingDirection?: "left" | "right";
    src: StaticImageData;
    alt: string;
    className?: string;
    style?: CSSProperties;
}

const FloatingPicture: FunctionComponent<FloatingPictureProps> = ({src, alt, className, floatingDirection, style}) => {
    const animation = floatingDirection === "left" ? "animate-float-left" : "animate-float-right";
    return (
        <Image src={src} alt={alt} className={cn(className, animation)} style={style}/>
    );
};

export default FloatingPicture;
