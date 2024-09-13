import PhotoDisplayer from "@/components/photo-displayer/photo-displayer";
import { Badge } from "@/components/ui/badge";
import { FunctionComponent } from "react";

const Gallery: FunctionComponent = () => {
  return (
    <article className="smooth md:grid md:grid-cols-2 md:grid-rows-1 relative font-display size-full bg-gray-900 uppercase flex flex-col items-center justify-start px-4 pt-[11rem] gap-6">
      <Badge className={"md:self-start md:ml-[25%]"}>
        <span className={"pr-2 text-sm self"}>📷</span>
        <p> Les coulisses </p>
      </Badge>
      <h2
        className={
          "smooth text-4xl md:text-[80px] lg:text-[100px] xl:text-[131px] md:w-1/2 md:mt-4 md:leading-none"
        }
      >
        Gallerie des champions
      </h2>
      <PhotoDisplayer />
    </article>
  );
};

export default Gallery;
