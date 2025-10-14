// React import not required with the new JSX transform

type Slice = { label: string; value: number; color?: string }

function polarToCartesian(cx: number, cy: number, r: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0
  return {
    x: cx + (r * Math.cos(angleInRadians)),
    y: cy + (r * Math.sin(angleInRadians))
  }
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const delta = endAngle - startAngle
  const largeArcFlag = Math.abs(delta) <= 180 ? '0' : '1'
  // sweep-flag = 1 for clockwise
  const d = [`M ${cx} ${cy}`, `L ${start.x} ${start.y}`, `A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`, 'Z'].join(' ')
  return d
}

export default function PieChart({ slices, size = 160 }: { slices: Slice[]; size?: number }) {
  const total = slices.reduce((s, x) => s + Math.max(0, x.value), 0)
  let angle = 0
  const cx = size / 2
  const cy = size / 2
  const r = Math.min(cx, cy) - 4

  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices.map((s, i) => {
          const value = Math.max(0, s.value)
          if (value === 0 || total === 0) return null
          const portion = (value / total) * 360
          const start = angle
          const end = angle + portion
          angle += portion

          // full circle: draw as <circle>
          if (portion >= 359.999) {
            return <circle key={i} cx={cx} cy={cy} r={r} fill={s.color || ['#0ea5e9', '#f97316', '#10b981', '#ef4444'][i % 4]} />
          }

          const d = describeArc(cx, cy, r, start, end)
          return <path key={i} d={d} fill={s.color || ['#0ea5e9', '#f97316', '#10b981', '#ef4444'][i % 4]} stroke="#fff" />
        })}
      </svg>
      <div className="flex flex-col text-sm">
        {slices.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <span style={{ width: 12, height: 12, background: s.color || ['#0ea5e9', '#f97316', '#10b981', '#ef4444'][i % 4] }} className="inline-block rounded-sm" />
            <span className="capitalize">{s.label}</span>
            <span className="text-slate-600">{s.value}</span>
          </div>
        ))}
        <div className="text-xs text-slate-500 mt-1">Total: {total}</div>
      </div>
    </div>
  )
}
