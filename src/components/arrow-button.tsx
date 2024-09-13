import {FunctionComponent} from "react";
import {Button, ButtonProps} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {ArrowRight} from "lucide-react";

const ArrowButton: FunctionComponent<ButtonProps & { iconSize?: number }> = (props) => {
    return <Button {...props} className={cn(props.className, "smooth text-xl hover:scale-125")}>
        { props.children }
        <ArrowRight className={"ml-2"} size={props.iconSize ?? 15} />
    </Button>
}

export default ArrowButton;