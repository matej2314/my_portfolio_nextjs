'use client';

import { createContext, useContext, type ReactNode } from 'react';

const ProjectInterceptCloseContext = createContext<(() => Promise<void>) | null>(null);

export function ProjectInterceptCloseProvider({
    onRequestClose,
    children,
}: {
    onRequestClose: () => Promise<void>;
    children: ReactNode;
}) {
    return (
        <ProjectInterceptCloseContext.Provider value={onRequestClose}>
            {children}
        </ProjectInterceptCloseContext.Provider>
    );
}

export function useProjectInterceptClose() {
    return useContext(ProjectInterceptCloseContext);
}
