import {FunctionComponent} from "react";

const PhotoDisplayer: FunctionComponent<{
    images: string[];
}> = ({images}) => {
    const doubled = [...images, ...images];

    return (
        <div className={"w-full overflow-hidden flex flex-col gap-2"}>
            <div className={"flex w-max animate-marquee-left"}>
                {doubled.map((img, index) => (
                    <img
                        key={index}
                        className={"max-h-[288px] sm:max-h-[500px] mr-2"}
                        src={img}
                        alt={index < images.length ? `gallery picture ${index + 1}` : ""}
                        loading={"lazy"}
                    />
                ))}
            </div>
            <div className={"flex w-max animate-marquee-right"}>
                {doubled.map((img, index) => (
                    <img
                        key={index}
                        className={"max-h-[288px] sm:max-h-[500px] mr-2"}
                        src={img}
                        alt={""}
                        loading={"lazy"}
                    />
                ))}
            </div>
        </div>
    );
};

export default PhotoDisplayer;
