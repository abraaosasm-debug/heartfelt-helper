export function GuaranteeSeal() {
  return (
    <div
      className="v11-guarantee-seal"
      role="img"
      aria-label="Garantia de 30 dias. Compra protegida."
    >
      <svg viewBox="0 0 240 240" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="v11-seal-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8d5d05" />
            <stop offset="0.18" stopColor="#f3cb57" />
            <stop offset="0.34" stopColor="#fff0a2" />
            <stop offset="0.52" stopColor="#c88d10" />
            <stop offset="0.72" stopColor="#f7d96e" />
            <stop offset="1" stopColor="#936006" />
          </linearGradient>
          <radialGradient id="v11-seal-center" cx="35%" cy="24%" r="82%">
            <stop offset="0" stopColor="#fffbe5" />
            <stop offset="0.58" stopColor="#ffe994" />
            <stop offset="1" stopColor="#e0ad2b" />
          </radialGradient>
          <linearGradient id="v11-seal-rim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff3ad" />
            <stop offset="0.45" stopColor="#d69c17" />
            <stop offset="1" stopColor="#7e5104" />
          </linearGradient>
        </defs>

        <path
          className="v11-seal-rosette"
          d="M120 8 139.9 20 162.9 16.5 176.7 35.2 199.2 40.8 204.8 63.3 223.5 77.1 220 100.1 232 120 220 139.9 223.5 162.9 204.8 176.7 199.2 199.2 176.7 204.8 162.9 223.5 139.9 220 120 232 100.1 220 77.1 223.5 63.3 204.8 40.8 199.2 35.2 176.7 16.5 162.9 20 139.9 8 120 20 100.1 16.5 77.1 35.2 63.3 40.8 40.8 63.3 35.2 77.1 16.5 100.1 20Z"
        />
        <circle className="v11-seal-medallion" cx="120" cy="120" r="96" />
        <circle className="v11-seal-ring-outer" cx="120" cy="120" r="92" />
        <circle className="v11-seal-ring-inner" cx="120" cy="120" r="84" />
        <circle className="v11-seal-radials" cx="120" cy="120" r="79" />

        <text className="v11-seal-label v11-seal-label-top" x="120" y="48">
          GARANTIA
        </text>

        <g className="v11-seal-shield">
          <path d="M120 61 139 68.5v14.8c0 11.7-7.7 21.8-19 26.4-11.3-4.6-19-14.7-19-26.4V68.5L120 61Z" />
          <path d="m111 84.5 6 6 12-12.5" />
        </g>

        <g className="v11-seal-laurel v11-seal-laurel-left">
          <path d="M72 159c-7-14-8-31-2-48" />
          <ellipse cx="69" cy="146" rx="4.2" ry="8.2" transform="rotate(-35 69 146)" />
          <ellipse cx="67" cy="132" rx="4.2" ry="8.2" transform="rotate(-20 67 132)" />
          <ellipse cx="70" cy="118" rx="4.2" ry="8.2" transform="rotate(-4 70 118)" />
          <ellipse cx="76" cy="151" rx="4.2" ry="8.2" transform="rotate(34 76 151)" />
          <ellipse cx="76" cy="137" rx="4.2" ry="8.2" transform="rotate(22 76 137)" />
          <ellipse cx="78" cy="123" rx="4.2" ry="8.2" transform="rotate(8 78 123)" />
        </g>
        <g className="v11-seal-laurel v11-seal-laurel-right">
          <path d="M168 159c7-14 8-31 2-48" />
          <ellipse cx="171" cy="146" rx="4.2" ry="8.2" transform="rotate(35 171 146)" />
          <ellipse cx="173" cy="132" rx="4.2" ry="8.2" transform="rotate(20 173 132)" />
          <ellipse cx="170" cy="118" rx="4.2" ry="8.2" transform="rotate(4 170 118)" />
          <ellipse cx="164" cy="151" rx="4.2" ry="8.2" transform="rotate(-34 164 151)" />
          <ellipse cx="164" cy="137" rx="4.2" ry="8.2" transform="rotate(-22 164 137)" />
          <ellipse cx="162" cy="123" rx="4.2" ry="8.2" transform="rotate(-8 162 123)" />
        </g>

        <text className="v11-seal-days-number" x="120" y="151">
          30
        </text>
        <text className="v11-seal-days-label" x="120" y="173">
          DIAS
        </text>
        <text className="v11-seal-stars" x="120" y="191">
          ★ ★ ★
        </text>
        <text className="v11-seal-label v11-seal-label-bottom" x="120" y="211">
          COMPRA PROTEGIDA
        </text>

        <g className="v11-seal-glint v11-seal-glint-left">
          <path d="M33 57v18M24 66h18" />
        </g>
        <g className="v11-seal-glint v11-seal-glint-right">
          <path d="M207 139v15M199.5 146.5h15" />
        </g>
      </svg>
    </div>
  );
}
