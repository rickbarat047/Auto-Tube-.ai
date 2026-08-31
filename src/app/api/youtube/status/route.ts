import { NextResponse } from 'next/server';
import { getServerState } from '@/src/server/state';

export async function GET() {
  const state = getServerState();
  const channel = state.currentChannel;
  return NextResponse.json({
    isConnected: channel.isConnected,
    channel: channel,
    quota: {
      usedToday: channel.quotaUsedToday || 1600,
      dailyLimit: channel.dailyQuotaLimit || 10000,
      percentage: Math.round(((channel.quotaUsedToday || 1600) / (channel.dailyQuotaLimit || 10000)) * 100),
    },
    scopes: [
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/youtube.force-ssl',
      'https://www.googleapis.com/auth/youtubepartner',
    ],
    tokenStatus: 'active',
    tokenExpiresAt: channel.authExpiry || '2026-12-31',
  });
}
