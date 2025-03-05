"use client";

import {FunctionComponent, useEffect, useState} from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    useCarousel
} from "@/components/ui/carousel.tsx";
import placeholder from "@/assets/photos/arthur-et-romain.png";
import {cn} from "@/lib/utils.ts";
import {useAppContext} from "@/contents/App.tsx";

const WinnerCarousel: FunctionComponent = () => {
    const app = useAppContext();
    const [images, setImages] = useState<string[]>(Array.from({length: 10}, () => placeholder.src));

    useEffect(() => {
        const imgs = app.carousel.images.reduce<string[]>((acc, curr) => {
            if (typeof curr.image === "string") {
                acc.push(curr.image);
            } else {
                if (curr.image.url != null) {
                    acc.push(curr.image.url);
                } else {
                    acc.push(placeholder.src);
                }
            }
            return acc;
        }, []);
        setImages(imgs);
    }, []);

    return <section className={"w-full"}>
        <Carousel opts={{
            loop: true,
            axis: "x",
        }}>
            <CarouselImages images={images} />
        </Carousel>
    </section>;
};


function CarouselImages({ images }: { images: string[] }) {
    const { currentSlide } = useCarousel();

    return <>
        <CarouselContent>
            {images.map((src, index) => (
                <CarouselItem key={src+index} className={cn("smooth max-h-[300px] md:max-h-[455px] rounded-xl flex flex-col items-center justify-center", {
                    "invisible opacity-0 transition-opacity duration-500": currentSlide !== index,
                })}>
                    <img className={"max-h-full rounded-xl"} src={src} alt={"Winner-" + index} loading={'lazy'} />
                    <p className={"text-white text-center"}>
                        {index+1}/{images.length}
                    </p>
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className={"top-[115%] left-1/3"} />
        <CarouselNext className={"top-[115%] right-1/3"} />
    </>;
}

export default WinnerCarousel;