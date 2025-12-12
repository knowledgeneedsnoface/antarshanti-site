import React from 'react';
import { AtlasProvider } from './(store)/atlasContext';
import './inner-atlas.css';

export const metadata = {
    title: 'Inner Atlas | AntarShanti',
    description: 'Your narrative map journey to peace.',
};

export default function InnerAtlasLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AtlasProvider>
            <div className="inner-atlas-root min-h-screen bg-[#0A0502] text-white">
                {children}
            </div>
        </AtlasProvider>
    );
}
