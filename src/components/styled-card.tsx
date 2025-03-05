import {FunctionComponent, ReactNode, useRef} from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {cn} from "@/lib/utils.ts";
import MouseTooltip from "@/components/MouseTooltip.tsx";

interface StyledCardProps {
    icon?: ReactNode;
    children: ReactNode;
    disabled?: boolean;
}

const StyledCard: FunctionComponent<StyledCardProps> = ({icon, children, disabled}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    return <Card ref={cardRef} className={cn("relative w-full h-full border border-gray-700 p-4 pb-0", {"opacity-50 cursor-not-allowed": disabled})}>
        {disabled && <MouseTooltip parentRef={cardRef}>
            <span className={"text-xl"}>🚧 </span>
            <span className={"text-xs"}>Indisponible pour le moment</span>
        </MouseTooltip>}
        <CardContent
            className={cn("h-full text-center font-display flex flex-col items-center gap-2", {"pointer-events-none": disabled})}>
            {icon}
            {children}
        </CardContent>
    </Card>
}

export default StyledCard;

