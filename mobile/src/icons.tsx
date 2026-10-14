import Svg, { Circle, Path, Rect } from "react-native-svg";

type P = { color?: string; size?: number };

export function Sparkle({ color = "#000", size = 16 }: P) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size}>
      <Path d="M14.98 14.98 12.7 21.26a.75.75 0 0 1-1.41 0L9.02 14.98 2.74 12.7a.75.75 0 0 1 0-1.41L9.02 9.02l2.28-6.28a.75.75 0 0 1 1.41 0l2.28 6.28 6.28 2.28a.75.75 0 0 1 0 1.41Z" fill={color} stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
    </Svg>
  );
}
export function Check({ color = "#000", size = 22 }: P) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size}>
      <Circle cx={12} cy={12} r={10} fill={color} fillOpacity={0.16} />
      <Path d="M8 13l3 3 5-7M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
export function Tick({ color = "#fff", size = 14 }: P) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size}>
      <Path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
export function Cross({ color = "#000", size = 22 }: P) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size}>
      <Path d="M7.76 7.76l8.48 8.48M16.24 7.76l-8.48 8.48" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
export function Plus({ color = "#fff", size = 22 }: P) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size}>
      <Path d="M12 5v14M5 12h14" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
export function Heart({ color = "#000", size = 22 }: P) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size}>
      <Path d="M16.55 3.08c2.2 0 4.19 1.33 5.03 3.37a5.45 5.45 0 0 1-1.18 5.94l-8.36 8.36-8.4-8.4A5.45 5.45 0 1 1 11.4 4.68l.65.65.66-.65a5.43 5.43 0 0 1 3.84-1.6" fill={color} fillOpacity={0.16} stroke={color} strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}
export function Bolt({ color = "#000", size = 15 }: P) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size}>
      <Path d="M15 1.5 13.5 9l6 2.25L9 22.5l1.5-7.5-6-2.25Z" fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
    </Svg>
  );
}
export function Star({ color = "#ff4d00", size = 20 }: P) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size}>
      <Path d="M12 17.73l5.13 3.15a.75.75 0 0 0 1.12-.81l-1.4-5.89 4.57-3.94a.75.75 0 0 0-.43-1.31l-5.99-.49-2.3-5.59a.75.75 0 0 0-1.4 0L8.97 8.44l-5.99.49a.75.75 0 0 0-.43 1.31l4.57 3.94-1.4 5.89a.75.75 0 0 0 1.12.81Z" fill={color} />
    </Svg>
  );
}
export function Instagram({ color = "#000", size = 22 }: P) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size}>
      <Rect x={3} y={3} width={18} height={18} rx={5} fill={color} fillOpacity={0.12} stroke={color} strokeWidth={2} />
      <Circle cx={12} cy={12} r={4} fill="none" stroke={color} strokeWidth={2} />
      <Circle cx={17.3} cy={6.7} r={1.2} fill={color} />
    </Svg>
  );
}
