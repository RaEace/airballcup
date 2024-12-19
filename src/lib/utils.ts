import {type ClassValue, clsx} from "clsx"
import {extendTailwindMerge} from "tailwind-merge"
import {MouseEventHandler} from "react";
import {parse} from "@std/toml";

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

export const GALLERY = process.env.GALLERY_DIR;
export const WINNERS = process.env.WINNERS_DIR;
export const RULES = process.env.RULES_DOC;
export const SECTIONS_TEXT = process.env.SECTIONS_DOC;
export const TOURNAMENT_INFO = process.env.TOURNAMENT_INFO_DOC;

export const sectionsLinkedList = [
    { prev: null, current: "cta", next: "history" },
    { prev: "cta", current: "history", next: "participate" },
    { prev: "history", current: "participate", next: "winners" },
    { prev: "participate", current: "winners", next: "cost" },
    { prev: "winners", current: "cost", next: "rules" },
    { prev: "cost", current: "rules", next: "gallery" },
    { prev: "rules", current: "gallery", next: "tournament-info" },
    { prev: "gallery", current: "tournament-info", next: null },
];

function sanitizeString(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function translateTomlToJson<T extends Object>(tomlContent: string): T {
    const json = parse(sanitizeString(tomlContent)) as unknown as T;
    return json as T;
}