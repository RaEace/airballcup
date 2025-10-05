'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import {Carousel, Gallery, Rule, Tournament} from "@/payload-types.ts";

const App = dynamic(() => import('@/contents/App'), {ssr: false});

export type CtaTextContent = {
    badgeText: string;
    headerText: string;
}

export interface ClientOnlyProps {
    contents: {
        sectionsText: { cta: CtaTextContent };
        tournamentInfo: Tournament;
        rules: Rule[];
        carousel: Carousel;
        gallery: Gallery;
    }
}

export function ClientOnly({contents}: ClientOnlyProps) {
    return <App contents={contents}/>;
}