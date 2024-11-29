'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const App = dynamic(() => import('@/contents/App'), { ssr: false });

export type CtaTextContent = {
    badgeText: string;
    headerText: string;
}

export type TournamentInfoContent = {
    badgeText: string;
    date: string;
    startingHour: string;
}

export type RulesContent = {
    title: string;
    content: string;
}

export interface ClientOnlyProps {
    contents: {
        sectionsText: { cta: CtaTextContent };
        tournamentInfo: TournamentInfoContent;
        rules: RulesContent[];
        loadImageAction: (folderName: "winners" | "gallery") => Promise<{
            id: string;
            name: string;
            url: string;
        }[]>;
    }
}

export function ClientOnly({ contents }: ClientOnlyProps) {
    return <App contents={contents} />;
}