import {type ClassValue, clsx} from "clsx"
import {extendTailwindMerge} from "tailwind-merge"
import {MouseEventHandler} from "react";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
          "text-display-l", "text-display-s", "text-title-l", "text-title-m", "text-title-s", "text-subtitle-l", "text-subtitle-m",
          "text-button-l", "text-button-m", "text-button-s", "text-text-m", "text-text-s", "text-tag-l", "text-tag-m"
      ]
    }
  }
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleScrollToSection: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();

    const target = event.currentTarget.getAttribute("href");
    if (!target) return;

    const targetId = target.substring(1);
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    targetElement.scrollIntoView({behavior: "smooth"});
}