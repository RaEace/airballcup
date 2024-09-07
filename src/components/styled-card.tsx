import {FunctionComponent, ReactNode} from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";

interface StyledCardProps {
    icon?: ReactNode;
    text: ReactNode;
}

const StyledCard: FunctionComponent<StyledCardProps> = ({ icon, text }) => {
    return <Card className={"w-full border border-gray-700 p-4 pb-0"}>
        <CardContent className={"text-center uppercase font-display flex flex-col items-center gap-2"}>
            { icon }
            <b>
                { text }
            </b>
        </CardContent>
    </Card>
}

export default StyledCard;

