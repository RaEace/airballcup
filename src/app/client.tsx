'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const App = dynamic(() => import('@/contents/App'), { ssr: false });

type CtaTextContent = {
    badgeText: string;
    headerText: string;
}

type TournamentInfoContent = {
    badgeText: string;
    date: string;
    startingHour: string;
}

export type RulesContent = {
    name: string;
    content: string;
}

export interface ClientOnlyProps {
    contents: {
        cta: CtaTextContent;
        tournamentInfo: TournamentInfoContent;
        rules: RulesContent[];
        loadImageAction: (folderName: "winners" | "gallery") => Promise<{
            id: string | null | undefined;
            name: string | null | undefined;
            url: string;
        }[]>;
    }
}

export function ClientOnly({ contents }: ClientOnlyProps) {
    return <App contents={contents} />;
}