'use client';

import { useState } from 'react';

const MCP_URL = 'https://theme-engine-repo.vercel.app/api/mcp';
const CLI_CMD = `claude mcp add theme-engine --transport http ${MCP_URL}`;

const STEPS = [
  {
    num: '1',
    title: 'Open your terminal',
    desc: 'Any terminal works — Command Prompt, PowerShell, Terminal on Mac/Linux.',
  },
  {
    num: '2',
    title: 'Paste and run this command',
    desc: 'Copy the command below and paste it into your terminal, then press Enter.',
    code: true,
  },
  {
    num: '3',
    title: 'Done — use it in any project',
    desc: 'Open Claude Code in any project and say "list themes" or "apply jains-crm theme".',
  },
];

export default function ConnectPage() {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(CLI_CMD).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = CLI_CMD;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #07111f 0%, #0a1a36 50%, #071425 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: '24px',
    }}>
      {/* Brand stripe */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #38BDF8, #0284C7, #07111f, #0284C7, #38BDF8)', zIndex: 100 }} />

      {/* Card */}
      <div style={{
        background: 'rgba(10,26,54,0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(56,189,248,0.18)',
        borderRadius: 24,
        padding: '48px 40px',
        maxWidth: 560,
        width: '100%',
        boxShadow: '0 0 0 1px rgba(56,189,248,0.08), 0 24px 64px rgba(0,0,0,0.6)',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>🎨</div>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', color: '#38BDF8', textTransform: 'uppercase', marginBottom: 12 }}>JISL Theme Engine</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#DFF0F9', margin: '0 0 10px', lineHeight: 1.25 }}>
            Connect to Claude Code
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(223,240,249,0.5)', lineHeight: 1.65, margin: 0 }}>
            3 steps to give Claude access to 90+ themes and 18k+ mobile app references — in every project.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {STEPS.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < STEPS.length - 1 ? 28 : 0 }}>
              {/* Number + line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'rgba(56,189,248,0.15)',
                  border: '1.5px solid rgba(56,189,248,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, color: '#38BDF8', flexShrink: 0,
                }}>{step.num}</div>
                {i < STEPS.length - 1 && (
                  <div style={{ width: 1, flex: 1, minHeight: 20, background: 'rgba(56,189,248,0.12)', marginTop: 6 }} />
                )}
              </div>

              {/* Content */}
              <div style={{ paddingTop: 4, flex: 1, paddingBottom: i < STEPS.length - 1 ? 0 : 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#DFF0F9', marginBottom: 6 }}>{step.title}</div>
                <div style={{ fontSize: 13, color: 'rgba(223,240,249,0.5)', lineHeight: 1.6, marginBottom: step.code ? 14 : 0 }}>{step.desc}</div>

                {step.code && (
                  <>
                    {/* Command box */}
                    <div style={{
                      background: 'rgba(0,0,0,0.5)',
                      border: '1px solid rgba(56,189,248,0.2)',
                      borderRadius: 10,
                      padding: '14px 16px',
                      marginBottom: 10,
                      overflowX: 'auto',
                    }}>
                      <code style={{ fontSize: 12, color: '#38BDF8', fontFamily: "'SF Mono', 'Fira Code', monospace", whiteSpace: 'nowrap' }}>
                        {CLI_CMD}
                      </code>
                    </div>

                    {/* Copy button */}
                    <button
                      onClick={copy}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        background: copied ? 'rgba(52,211,153,0.15)' : 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
                        border: copied ? '1px solid rgba(52,211,153,0.4)' : 'none',
                        borderRadius: 8,
                        color: copied ? '#34D399' : '#07111f',
                        fontSize: 13, fontWeight: 700,
                        padding: '10px 20px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: copied ? 'none' : '0 0 18px rgba(56,189,248,0.3)',
                      }}
                    >
                      {copied ? '✓ Copied!' : '⎘ Copy Command'}
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(56,189,248,0.1)', margin: '36px 0 28px' }} />

        {/* What you can do */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(223,240,249,0.25)', textTransform: 'uppercase', marginBottom: 18 }}>
            After connecting — say this to Claude
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Themes',   examples: ['"Apply the jains-crm theme to this project"', '"Find me a dark enterprise theme"'] },
              { label: 'Mobile',   examples: ['"Show me food delivery app references"', '"Get screens for a fitness app"'] },
              { label: 'Export',   examples: ['"Give me the CSS for obsidian theme"', '"Get the Claude prompt for pulse theme"'] },
            ].map(group => (
              <div key={group.label} style={{
                background: 'rgba(7,17,31,0.5)',
                border: '1px solid rgba(56,189,248,0.08)',
                borderRadius: 10, padding: '12px 16px',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#38BDF8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{group.label}</div>
                {group.examples.map(ex => (
                  <div key={ex} style={{ fontSize: 12, color: 'rgba(223,240,249,0.45)', marginBottom: 4, lineHeight: 1.5 }}>
                    → {ex}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 20, fontSize: 12, color: 'rgba(223,240,249,0.18)', textAlign: 'center' }}>
        JISL Theme Engine ·{' '}
        <a href="/theme-studio" style={{ color: 'rgba(56,189,248,0.4)', textDecoration: 'none' }}>Open Studio</a>
      </div>
    </div>
  );
}
