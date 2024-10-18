import {FunctionComponent} from "react";
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

const WinnerCarousel: FunctionComponent = () => {
    const images = Array.from({length: 10}, () => placeholder);

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
                <CarouselItem
                    style={{
                        transform: `rotate(${getRandomRotation(index)}deg)`,
                    }} key={src+index} className={cn("bg-white p-4", {
                    "invisible opacity-0 transition-opacity duration-500": currentSlide !== index,
                })}>
                    <img src={src} alt={"Winner-" + index} />
                    <p className={"text-black text-center"}>
                        <span className={"font-bold"}>Arthur et Romain</span> - {index}
                    </p>
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className={"top-[110%] left-1/3"} />
        <CarouselNext className={"top-[110%] right-1/3"} />
    </>;
}

function getRandomRotation(pictureIndex: number) {
    const min = -20; // Min degree of rotation
    const max = 20;  // Max degree of rotation
    return (Math.round(Math.random() * (max - min + 1)) + min) * (pictureIndex % 2 === 0 ? 1 : -1);
}

export default WinnerCarousel;