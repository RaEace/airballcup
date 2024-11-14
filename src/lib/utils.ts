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

export const GALLERIE = "1JP9lmyb7QykVQRfMROHhYZPxO8s4TIN3";
export const WINNERS = "19AlYz7i6U-McNJ9UJainAIJhh37BnG0J";
export const RULES = "1n6ra_uUNGC8MyRn8duQ1UVPcQmT_lmV6";
export const SECTIONS_TEXT = "1ytVX7bgO0Na3dpYj7MeE5Uvxmj5CotkkVIJ4Iq1MWtU";
export const TOURNAMENT_INFO = "1frScDovZZvGDfG_bWqXl8INqaBu6hcCUaqmBtdIqZ5s";

export const CURRENT_SIGNUP_URL = "https://www.billetweb.fr/air-ball-cup-10&multi=u234108&margin=no_margin&color=635BFF&parent=1&margin=no_margin&color=635BFF";