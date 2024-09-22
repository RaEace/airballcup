import {CSSProperties, FunctionComponent, ImgHTMLAttributes, ReactNode} from "react";
import {cn} from "@/lib/utils.ts";

const Polaroid: FunctionComponent<ImgHTMLAttributes<HTMLImageElement> & {
    children: ReactNode;
    wrapperClassName?: string;
    wrapperStyle?: CSSProperties;
}> = ({children, wrapperClassName, wrapperStyle, ...props}) => {
    return <div style={wrapperStyle} className={cn("relative bg-white shadow-lg p-4 max-w-xs pb-10", wrapperClassName)}>
        <div className="bg-gray-200 h-64 w-full mb-4">
            <img {...props} className={cn("h-full w-full object-cover bg-cover", props.className)} alt={props.alt} />
        </div>
        <div className={"absolute bottom-0 transform -translate-x-1/2 left-1/2 pb-2"}>
            { children }
        </div>
    </div>
};

export default Polaroid;