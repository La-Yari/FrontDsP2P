export function Slider({ value, onChange, accent, min = 0, max = 2, step = 0.1, ...rest }) {
  return (
    <input
      type="range"
      className="slider"
      min={min}
      max={max}
      step={step}
      value={value}
      style={accent ? { accentColor: accent } : undefined}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      {...rest}
    />
  );
}
