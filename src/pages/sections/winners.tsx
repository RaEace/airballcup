import {FunctionComponent} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import placeholder from "@/assets/photos/arthur-et-romain.png";
import winner1 from "@/assets/photos/2024-09-26-winners.png";
import history1 from "@/assets/photos/photo-1-history.png";
import Polaroid from "@/components/polaroid.tsx";

const Winners: FunctionComponent = () => {
    const images = [{
        image: placeholder,
        name: "Arthur et Romain",
        date: "17/11/2024",
    }, {
        image: winner1,
        name: "Simon et Gaël",
        date: "26/09/2024",
    }, {
        image: history1,
        name: "Histoire",
        date: "01/01/2024",
    }];

    return <article className={"sm:px-6 py-2 px-2 overflow-hidden relative w-full min-h-full flex flex-col items-center bg-secondary-500"}>
        <CircleBackground />
        <section className={"w-full my-auto h-full z-10 flex flex-col items-center md:grid md:grid-cols-2 md:grid-rows-1"}>
            <div className={"flex flex-col md:items-start items-center text-center gap-4"}>
                <Badge className={"smooth font-display uppercase"}>🏆 LES GOATS</Badge>
                <h2 className={"smooth lg:text-display-l-extrabold md:text-display-s-extrabold md:text-left uppercase font-display text-title-l-extrabold"}>Nos derniers vainqueurs</h2>
            </div>
            <div id="carousel" className={"mx-auto overflow-visible flex items-center justify-center"}>
                <Carousel opts={{
                    align: "center",
                    loop: true,
                }} className={"relative smooth md:w-full w-3/4 max-w-sm flex flex-col items-center"}>
                    <CarouselContent className={"-ml-1"}>
                        {images.map((image, index) => (
                            <CarouselItem key={index}>
                                <Polaroid wrapperStyle={{
                                    transform: `rotate(${getRandomRotation()}deg)`,
                                }} wrapperClassName={`mx-auto my-auto size-[90%] mt-4`} src={image.image} alt={image.name}>
                                    <p className={"font-display sm:text-[14px] text-[12px] uppercase text-black text-center"}>
                                        {image.name}
                                        <span className={"text-[12px] ml-2 text-secondary-500"}>{image.date}</span>
                                    </p>
                                </Polaroid>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className={"!absolute !top-[110%] left-1/3"} />
                    <CarouselNext className={"!absolute !top-[110%] right-1/3"} />
                </Carousel>
            </div>
        </section>
    </article>
};

const CircleBackground: FunctionComponent = () => {
    return <svg className={"absolute -top-20 z-1"} xmlns="http://www.w3.org/2000/svg" width="2131" height="910" viewBox="0 0 375 723" fill="none">
        <path d="M1649 118.122C1090.54 146.334 -4.3577 -73.5375 -482 -187C127.339 344.127 631 616 1649 723V118.122Z"
              fill="#224D9E"/>
    </svg>;
};

function getRandomRotation() {
    const min = -20; // Min degree of rotation
    const max = 20;  // Max degree of rotation
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default Winners;