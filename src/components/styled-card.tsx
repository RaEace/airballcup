import {FunctionComponent, ReactNode} from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";

interface StyledCardProps {
    icon?: ReactNode;
    children: ReactNode;
}

const StyledCard: FunctionComponent<StyledCardProps> = ({ icon, children }) => {
    return <Card className={"w-full h-full border border-gray-700 p-4 pb-0"}>
        <CardContent className={"h-full text-center font-display flex flex-col items-center gap-2"}>
            { icon }
            { children }
        </CardContent>
    </Card>
}

export default StyledCard;

