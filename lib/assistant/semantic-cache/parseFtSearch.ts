export type SemanticNeighbour = {
	key: string;
	reply: string;
	message: string;
	dist: number;
};

const asString = (value: unknown): string => {
	if (typeof value === 'string') return value;
	if (Buffer.isBuffer(value)) return value.toString('utf8');
	if (typeof value === 'number') return String(value);
	return '';
};

export const parseFtSearchKnn = (raw: unknown): SemanticNeighbour | null => {
	if (!Array.isArray(raw) || raw.length < 3) return null;

	const count = Number(raw[0]);
	if (!Number.isFinite(count) || count < 1) return null;

	const key = asString(raw[1]);
	const fields = raw[2];
	if (!Array.isArray(fields)) return null;

	const map = new Map<string, string>();
	for (let i = 0; i + 1 < fields.length; i += 2) {
		map.set(asString(fields[i]), asString(fields[i + 1]));
	}

	const reply = map.get('reply');
	if (!reply) return null;

	const dist = Number.parseFloat(map.get('dist') ?? '');
	if (!Number.isFinite(dist)) return null;

	return {
		key,
		reply,
		message: map.get('message') ?? '',
		dist,
	};
};
