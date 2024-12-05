"use client";

import {FunctionComponent, useEffect, useState} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import PhotoDisplayer from "@/components/photo-displayer/photo-displayer.tsx";
import placeholder1 from "@/assets/photos/photo-1-airballcup.jpeg";
import placeholder2 from "@/assets/photos/photo-2-airballcup.jpeg";
import placeholder3 from "@/assets/photos/photo-3-airballcup.jpeg";
import {useAppContext} from "@/contents/App.tsx";

const Gallery: FunctionComponent = () => {
    const app = useAppContext();
    const [images, setImages] = useState<string[]>([
        placeholder1.src,
        placeholder2.src,
        placeholder3.src,
    ]);

    useEffect(() => {
        app.loadImageAction("gallery").then((images) => {
            const urls = images.map((image) => image.url);
            setImages(urls);
        });
    }, []);

    return (
        <article id={"gallery"} className="flex min-h-full w-full flex-col items-center gap-4 px-6 pt-20 pb-4">
            <div className={"flex flex-col items-center gap-4"}>
                <Badge className={"smooth font-text font-bold sm:text-tag-l text-tag-m uppercase"}>📸 Les
                    coulisses</Badge>
                <h2 className={"smooth font-display font-bold uppercase lg:text-display-s md:text-title-l sm:text-title-m"}>
                    Galerie des <span className={"ml-1 text-secondary-500"}>champions</span>
                </h2>
            </div>
            <div className={"w-full"}>
                <PhotoDisplayer key={images.length + "1"} images={images} speed={10} />
            </div>
        </article>
    );
};

export default Gallery;
