import {FunctionComponent} from "react";
import {Button, ButtonProps} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {ArrowRight} from "lucide-react";

const ArrowButton: FunctionComponent<ButtonProps & { iconSize?: number; iconPlacement: "right" | "left" }> = ({iconSize,iconPlacement,...props}) => {
    return <Button {...props} className={cn(props.className, "smooth hover:scale-110")}>
        { iconPlacement === "left" && <ArrowRight size={iconSize ?? 24} className={"mr-2 mb-1"} /> }
        { props.children }
        { iconPlacement === "right" && <ArrowRight size={iconSize ?? 24} className={"ml-2 mb-1"} /> }
    </Button>
}
export default ArrowButton;