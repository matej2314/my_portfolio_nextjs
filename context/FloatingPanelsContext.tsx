'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export type FloatingPanelId = 'none' | 'contact' | 'chat';

type FloatingPanelsContextValue = {
	active: FloatingPanelId;
	openContact: () => void;
	openChat: () => void;
	close: () => void;
	isContactOpen: boolean;
	isChatOpen: boolean;
};

const FloatingPanelsContext = createContext<FloatingPanelsContextValue | null>(null);

export function FloatingPanelsProvider({ children }: { children: ReactNode }) {
	const [active, setActive] = useState<FloatingPanelId>('none');

	const openContact = useCallback(() => setActive('contact'), []);
	const openChat = useCallback(() => setActive('chat'), []);
	const close = useCallback(() => setActive('none'), []);

	const value = useMemo(
		() => ({
			active,
			openContact,
			openChat,
			close,
			isContactOpen: active === 'contact',
			isChatOpen: active === 'chat',
		}),
		[active, openContact, openChat, close],
	);

	return <FloatingPanelsContext.Provider value={value}>{children}</FloatingPanelsContext.Provider>;
}

export function useFloatingPanels() {
	return useContext(FloatingPanelsContext);
}
