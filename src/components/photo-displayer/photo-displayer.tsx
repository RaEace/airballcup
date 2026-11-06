import {FunctionComponent} from "react";
import Image from "next/image";

export type PhotoSource = {src: string; width: number; height: number};

const PhotoDisplayer: FunctionComponent<{
    images: PhotoSource[];
}> = ({images}) => {
    const doubled = [...images, ...images];

    return (
        <div className={"w-full overflow-hidden flex flex-col gap-2"}>
            <div className={"flex w-max animate-marquee-left"}>
                {doubled.map((img, index) => (
                    <Image
                        key={index}
                        className={"h-auto w-auto max-h-[288px] sm:max-h-[500px] mr-2"}
                        src={img.src}
                        width={img.width}
                        height={img.height}
                        sizes={"(min-width: 640px) 700px, 400px"}
                        alt={index < images.length ? `gallery picture ${index + 1}` : ""}
                        loading={"lazy"}
                    />
                ))}
            </div>
            <div className={"flex w-max animate-marquee-right"}>
                {doubled.map((img, index) => (
                    <Image
                        key={index}
                        className={"h-auto w-auto max-h-[288px] sm:max-h-[500px] mr-2"}
                        src={img.src}
                        width={img.width}
                        height={img.height}
                        sizes={"(min-width: 640px) 700px, 400px"}
                        alt={""}
                        loading={"lazy"}
                    />
                ))}
            </div>
        </div>
    );
};

export default PhotoDisplayer;
