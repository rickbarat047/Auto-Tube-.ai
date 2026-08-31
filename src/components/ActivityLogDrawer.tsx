import React from 'react';
import { X, Activity, RefreshCw, Terminal, CheckCircle2, AlertTriangle, XCircle, Bot } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ActivityLogDrawer: React.FC = () => {
  const { isLogDrawerOpen, setIsLogDrawerOpen, logs, refreshAll } = useApp();

  if (!isLogDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">AI Agent Execution Logs</h3>
            <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold">
              {logs.length} Events
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => refreshAll()}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsLogDrawerOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Logs List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2 text-xs font-mono"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-3.5 h-3.5 text-red-400" />
                  <span className="font-bold text-slate-200">{log.agentName}</span>
                </div>
                <span className="text-[10px] text-slate-500">{log.timestamp}</span>
              </div>

              <p className="text-slate-300 font-sans leading-relaxed text-[11px]">{log.action}</p>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-900">
                <span
                  className={`font-bold uppercase ${
                    log.status === 'success'
                      ? 'text-emerald-400'
                      : log.status === 'warning'
                      ? 'text-amber-400'
                      : log.status === 'error'
                      ? 'text-red-400'
                      : 'text-indigo-400'
                  }`}
                >
                  Status: {log.status}
                </span>
                {log.durationMs && <span>Execution: {log.durationMs}ms</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
