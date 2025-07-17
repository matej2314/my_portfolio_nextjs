export interface Params {
	params: Promise<{
		id?: string;
		action?: string;
		[key: string]: string | undefined;
	}>;
}
