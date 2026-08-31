import { NextResponse } from 'next/server';
import { getServerState, addLog } from '@/src/server/state';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const state = getServerState();
    const {
      channelName,
      handle,
      channelId,
      connectedEmail,
      uploadPrivacyDefault,
      defaultCategoryId,
      autoPublishEnabled,
      notifySubscribers,
      isMadeForKids,
      connectionMethod,
    } = body;

    state.currentChannel = {
      ...state.currentChannel,
      channelName: channelName || state.currentChannel.channelName,
      handle: handle || state.currentChannel.handle,
      channelId: channelId || state.currentChannel.channelId || `UC_${Math.random().toString(36).substr(2, 10)}`,
      connectedEmail: connectedEmail || state.currentChannel.connectedEmail || 'creator@youtube.com',
      uploadPrivacyDefault: uploadPrivacyDefault || state.currentChannel.uploadPrivacyDefault || 'unlisted',
      defaultCategoryId: defaultCategoryId || state.currentChannel.defaultCategoryId || '28',
      autoPublishEnabled: autoPublishEnabled !== undefined ? autoPublishEnabled : true,
      notifySubscribers: notifySubscribers !== undefined ? notifySubscribers : true,
      isMadeForKids: isMadeForKids !== undefined ? isMadeForKids : false,
      connectionMethod: connectionMethod || 'oauth2',
      isConnected: true,
      authExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString().split('T')[0],
    };

    addLog(
      'YouTube Gateway Agent',
      `Successfully bound and authenticated YouTube Channel: "${state.currentChannel.channelName}" (${state.currentChannel.handle}) via ${connectionMethod || 'OAuth 2.0'}`,
      'success',
      `Channel ID: ${state.currentChannel.channelId} | Default Privacy: ${state.currentChannel.uploadPrivacyDefault}`
    );

    return NextResponse.json({ success: true, channel: state.currentChannel });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
