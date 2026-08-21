export interface TextEmbedder {
	embed(text: string): Promise<number[] | null>;
}
