import { NextResponse } from 'next/server';
import { getServerState } from '@/src/server/state';

export async function GET() {
  const state = getServerState();
  return NextResponse.json({ competitors: state.storedCompetitors });
}
