import Color from 'color';

export default function colorAlpha(color: string, alpha: number) {
  return Color(color).alpha(alpha).string();
}
