import {FunctionComponent, ImgHTMLAttributes} from "react";
import {cn} from "@/lib/utils.ts";

interface FloatingPictureProps extends ImgHTMLAttributes<HTMLImageElement> {
    floatingDirection?: "left" | "right";
}

const FloatingPicture: FunctionComponent<FloatingPictureProps> = ({ src, alt, className, floatingDirection, ...props }) => {
    const animation = floatingDirection === "left" ? "animate-float-left" : "animate-float-right";

    return (
        <img {...props} src={src} alt={alt} className={cn(className, animation)}/>
    )
};

export default FloatingPicture;
