import { NextResponse } from 'next/server';
import { getServerState, addLog } from '@/src/server/state';

export async function POST(req: Request) {
  try {
    const { running, emergencyStop } = await req.json();
    const state = getServerState();
    if (emergencyStop) {
      state.currentChannel.isAutopilotRunning = false;
      state.currentChannel.automationMode = 'manual';
      addLog('Safety Controller', 'EMERGENCY STOP TRIGGERED: All autonomous publishing halted immediately.', 'warning');
    } else {
      state.currentChannel.isAutopilotRunning = running;
      addLog('Orchestrator Agent', `Autopilot ${running ? 'ACTIVATED' : 'PAUSED'} in ${state.currentChannel.automationMode} mode`, 'info');
    }
    return NextResponse.json({
      success: true,
      isAutopilotRunning: state.currentChannel.isAutopilotRunning,
      automationMode: state.currentChannel.automationMode,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
