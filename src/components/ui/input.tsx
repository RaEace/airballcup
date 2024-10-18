import * as React from "react"

import {cn} from "@/lib/utils"
import {cva} from "class-variance-authority";


export const inputVariants = cva("flex h-9 font-text w-full placeholder:text-center placeholder:text-button-s font-text placeholder:font-text placeholder:font-light placeholder:px-3 rounded-full border border-[#414147] bg-transparent px-4 py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    , {
        variants: {
            inputSize: {
                default: "size-auto px-4 py-2",
                sm: "h-[64px] w-[197px] rounded-full px-3",
                lg: "h-[72px] w-[221px] rounded-full px-8 py-6",
                icon: "rounded-full h-9 w-9",
            }
        },
        defaultVariants: {
            inputSize: "default",
        },
    });

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    inputSize: "default" | "sm" | "lg" | "icon" | null | undefined;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, type, inputSize, ...props}, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    inputVariants({inputSize, className}),
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export {Input}
