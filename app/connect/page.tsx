'use client';

export default function ConnectPage() {
  const MCP_URL = 'https://theme-engine-repo.vercel.app/api/mcp';
  const deepLink = `claude://mcp/install?name=theme-engine&transport=http&url=${encodeURIComponent(MCP_URL)}`;
  const cliCommand = `claude mcp add theme-engine --transport http ${MCP_URL}`;

  function copyCommand() {
    navigator.clipboard.writeText(cliCommand).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = cliCommand;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    });
    const btn = document.getElementById('copy-btn');
    if (btn) { btn.textContent = '✓ Copied!'; setTimeout(() => { btn.textContent = 'Copy command'; }, 2000); }
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
        maxWidth: 520,
        width: '100%',
        boxShadow: '0 0 0 1px rgba(56,189,248,0.08), 0 24px 64px rgba(0,0,0,0.6)',
        textAlign: 'center',
      }}>
        {/* Logo area */}
        <div style={{ fontSize: 48, marginBottom: 8 }}>🎨</div>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', color: '#38BDF8', textTransform: 'uppercase', marginBottom: 16 }}>JISL Theme Engine</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#DFF0F9', margin: '0 0 12px', lineHeight: 1.2 }}>
          Connect to Claude
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(223,240,249,0.6)', margin: '0 0 40px', lineHeight: 1.6 }}>
          Give Claude instant access to all themes, CSS, prompts, and mobile app references — in any project.
        </p>

        {/* Primary CTA */}
        <a
          href={deepLink}
          style={{
            display: 'block',
            background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
            color: '#07111f',
            fontWeight: 700,
            fontSize: 16,
            padding: '16px 32px',
            borderRadius: 12,
            textDecoration: 'none',
            marginBottom: 16,
            boxShadow: '0 0 22px rgba(56,189,248,0.35)',
            transition: 'opacity 0.15s',
          }}
          onMouseOver={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseOut={e => (e.currentTarget.style.opacity = '1')}
        >
          ⚡ Connect to Claude Code
        </a>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(56,189,248,0.12)' }} />
          <span style={{ fontSize: 12, color: 'rgba(223,240,249,0.3)' }}>or run in terminal</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(56,189,248,0.12)' }} />
        </div>

        {/* CLI command */}
        <div style={{
          background: 'rgba(7,17,31,0.8)',
          border: '1px solid rgba(56,189,248,0.14)',
          borderRadius: 10,
          padding: '14px 16px',
          textAlign: 'left',
          marginBottom: 12,
          position: 'relative',
        }}>
          <code style={{ fontSize: 12, color: '#38BDF8', wordBreak: 'break-all', fontFamily: 'monospace' }}>
            {cliCommand}
          </code>
        </div>
        <button
          id="copy-btn"
          onClick={copyCommand}
          style={{
            background: 'rgba(56,189,248,0.1)',
            border: '1px solid rgba(56,189,248,0.25)',
            borderRadius: 8,
            color: '#38BDF8',
            fontSize: 13,
            fontWeight: 600,
            padding: '10px 20px',
            cursor: 'pointer',
            width: '100%',
            transition: 'background 0.15s',
          }}
        >
          Copy command
        </button>

        {/* What you get */}
        <div style={{ marginTop: 40, textAlign: 'left' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(223,240,249,0.3)', textTransform: 'uppercase', marginBottom: 16 }}>What Claude can do after connecting</div>
          {[
            ['🎨', 'Browser Themes', 'Get CSS, HTML pages, prompt for any of 90+ themes'],
            ['📱', 'Mobile References', 'Browse 18k+ app screens, download with build prompt'],
            ['⚡', 'Instant Apply', 'Say "use jains-crm theme" — Claude applies it directly'],
            ['🔍', 'Smart Search', 'Search by category, color style, dark/light, keyword'],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: 14, marginBottom: 16, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#DFF0F9', marginBottom: 2 }}>{title}</div>
                <div style={{ fontSize: 12, color: 'rgba(223,240,249,0.45)', lineHeight: 1.5 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 24, fontSize: 12, color: 'rgba(223,240,249,0.2)', textAlign: 'center' }}>
        JISL Theme Engine · <a href="/theme-studio" style={{ color: 'rgba(56,189,248,0.5)', textDecoration: 'none' }}>Open Studio</a>
      </div>
    </div>
  );
}
