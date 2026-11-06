import {FunctionComponent} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import PhotoDisplayer, {PhotoSource} from "@/components/photo-displayer/photo-displayer.tsx";
import placeholder1 from "@/assets/photos/photo-1-airballcup.jpeg";
import placeholder2 from "@/assets/photos/photo-2-airballcup.jpeg";
import placeholder3 from "@/assets/photos/photo-3-airballcup.jpeg";
import {Gallery as GalleryType} from "@/payload-types.ts";
import placeholder from "@/assets/photos/arthur-et-romain.webp";

const Gallery: FunctionComponent<{gallery: GalleryType}> = ({gallery}) => {
    const images: PhotoSource[] = gallery.images.length > 0
        ? gallery.images.reduce<PhotoSource[]>((acc, curr) => {
            if (typeof curr.image === "string" || curr.image.url == null) {
                acc.push(placeholder);
            } else {
                acc.push({src: curr.image.url, width: curr.image.width ?? 800, height: curr.image.height ?? 600});
            }
            return acc;
        }, [])
        : [placeholder1, placeholder2, placeholder3];

    return (
        <article id={"gallery"} className="flex min-h-full w-full flex-col items-center gap-4 px-6 pt-20 pb-4">
            <div className={"flex flex-col items-center gap-4"}>
                <Badge className={"smooth font-text font-bold sm:text-tag-l text-tag-m uppercase"}>📸 Les coulisses</Badge>
                <h2 className={"smooth font-display font-bold uppercase lg:text-display-s md:text-title-l sm:text-title-m"}>
                    Galerie des <span className={"ml-1 text-secondary-500"}>champions</span>
                </h2>
            </div>
            <div className={"w-full"}>
                <PhotoDisplayer images={images}/>
            </div>
        </article>
    );
};

export default Gallery;
