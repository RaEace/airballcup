import {FunctionComponent} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import PhotoDisplayer from "@/components/photo-displayer/photo-displayer.tsx";

const Gallery: FunctionComponent = () => {
  return (
    <article className="flex min-h-full w-full flex-col items-center gap-4 px-6 pt-20 pb-4">
        <div className={"flex flex-col items-center gap-4"}>
            <Badge className={"smooth font-text font-bold sm:text-tag-l text-tag-m uppercase"}>📸 Les coulisses</Badge>
            <h2 className={"smooth font-display font-bold uppercase lg:text-display-s md:text-title-l sm:text-title-m"}>
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
