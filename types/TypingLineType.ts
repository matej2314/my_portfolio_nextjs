export type TypingLineType = {
    text: string;
    speed?: number;
    onComplete?: () => void;
    cursor: boolean;
};