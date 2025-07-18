export type SubmitBtnProps = {
	pendingTxt: string;
	idleTxt: string;
	backgroundColor: string;
	hoverClass: string;
	disabled?: boolean;
	submitted?: boolean; // Nowy prop do śledzenia czy formularz został wysłany
};
