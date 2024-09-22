import {FunctionComponent} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import PhotoDisplayer from "@/components/photo-displayer/photo-displayer.tsx";

const Gallery: FunctionComponent = () => {
  return (
    <article className="w-full min-h-full flex flex-col items-center px-6 pt-20 pb-4 gap-10">
        <div className={"flex flex-col items-center gap-4"}>
            <Badge className={"smooth font-display uppercase"}>📸 Les coulisses</Badge>
            <h2 className={"smooth font-display uppercase sm:text-title-l-extrabold text-title-m-extrabold"}>
                Gallerie des <span className={"ml-1 text-secondary-500"}>champions</span>
            </h2>
        </div>
        <div className={"w-full"}>
            <PhotoDisplayer speed={10} direction={"left"} />
            <PhotoDisplayer speed={10} direction={"right"} />
        </div>
    </article>
  );
};

export default Gallery;
