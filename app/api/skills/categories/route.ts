import { NextResponse } from 'next/server';
import { getSkillsCategories } from '@/actions/skills';

export async function GET() {
	const result = await getSkillsCategories();

	if ('error' in result) return NextResponse.json({ error: result.error }, { status: 500 });

	return NextResponse.json(result.categories);
}
