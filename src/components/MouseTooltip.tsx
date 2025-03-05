import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {ReactNode, useEffect, useState} from "react";

function MouseTooltip({
                          children,
                          parentRef
                      }: {
    children: ReactNode,
    parentRef: React.RefObject<HTMLElement>
}) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isWithinBounds, setIsWithinBounds] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!parentRef.current) return;

            // Get parent element boundaries
            const rect = parentRef.current.getBoundingClientRect();

            // Check if mouse is within parent boundaries
            const isInside =
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom;

            setIsWithinBounds(isInside);

            if (isInside) {
                setPosition({ x: e.clientX, y: e.clientY });
            }
        };

        // Add event listener to track mouse movement
        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup the event listener when component unmounts
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [parentRef]);

    return (
        <Tooltip open={isWithinBounds}>
            <TooltipTrigger asChild>
                <div
                    key={`${position.x}:${position.y}`}
                    className={'fixed'}
                    style={{
                        left: position.x,
                        top: position.y,
                        transform: 'translate(-50%, -100%)',
                        pointerEvents: 'none',
                        zIndex: 9999,
                    }}
                />
            </TooltipTrigger>
            <TooltipContent>
                {children}
            </TooltipContent>
        </Tooltip>
    );
}

export default MouseTooltip;