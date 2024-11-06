import * as React from "react";
import {Slot} from "@radix-ui/react-slot";
import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex font-text rounded-full py-1 items-center justify-center whitespace-nowrap text-sm uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary-500 hover:bg-primary-600 text-white",
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-gray-900 text-gray-900 bg-white shadow-sm hover:bg-white/80 hover:text-gray-900",
        secondary:
          "bg-secondary-500 rounded-full text-white shadow-sm hover:bg-secondary/80",
        invertedPrimary: "font-text font-bold text-primary-500 bg-white hover:bg-white/90",
        ghost: "hover:bg-transparent/10",

        warning:
          "bg-warning-500 text-warning-foreground shadow-sm hover:bg-warning/90",
        link: "text-white underline-offset-4 hover:text-primary-500 smooth",
      },
      size: {
        default: "size-auto px-4 py-2 font-text font-bold",
        xsm: "h-[32px] w-[120px] rounded-full px-6 font-text font-bold text-button-s",
        sm: "h-[64px] w-[197px] rounded-full px-3 font-text font-bold text-button-s",
        lg: "h-[72px] w-[221px] rounded-full px-8 py-6 font-tex font-bold text-button-l",
        icon: "rounded-full h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        title={props.title ?? props.name}
        className={cn(
          buttonVariants({ variant, size, className }),
          "font-text"
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
