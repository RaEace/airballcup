"use client";

import * as React from "react";
import {Slot} from "@radix-ui/react-slot";
import {type VariantProps} from "class-variance-authority";

import {cn} from "@/lib/utils";
import {sendGTMEvent} from "@next/third-parties/google";
import {buttonVariants} from "@/components/ui/button-variants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    function sendGoogleAnalyticsEvent() {
        sendGTMEvent({
            event: "button_click",
            category: "button",
            action: "click",
            label: props.name ?? props.title,
        });
    }

    return (
      <Comp
        title={props.title ?? props.name}
        className={cn(
          buttonVariants({ variant, size, className }),
          "font-text"
        )}
        ref={ref}
        onClick={(e) => {
            sendGoogleAnalyticsEvent();
            onClick?.(e);
        }}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
