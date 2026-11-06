import {FunctionComponent} from "react";
import Image from "next/image";

export type PhotoSource = {src: string; width: number; height: number};

type MediaLike = {url?: string | null; width?: number | null; height?: number | null};

export function toPhoto(image: string | MediaLike, placeholder: PhotoSource): PhotoSource {
    if (typeof image === "string" || image.url == null) {
        return placeholder;
    }
    return {src: image.url, width: image.width ?? 800, height: image.height ?? 600};
}

const ROWS = [{cls: "animate-marquee-left"}, {cls: "animate-marquee-right"}];

const PhotoDisplayer: FunctionComponent<{
    images: PhotoSource[];
}> = ({images}) => {
    const doubled = [...images, ...images];

    return (
        <div className={"w-full overflow-hidden flex flex-col gap-2"}>
            {ROWS.map(({cls}, row) => (
                <div key={cls} className={`flex w-max ${cls}`}>
                    {doubled.map((img, index) => (
                        <Image
                            key={index}
                            className={"h-[288px] sm:h-[500px] w-auto mr-2"}
                            src={img.src}
                            width={img.width}
                            height={img.height}
                            sizes={"(min-width: 640px) 700px, 400px"}
                            alt={row === 0 && index < images.length ? `gallery picture ${index + 1}` : ""}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default PhotoDisplayer;
