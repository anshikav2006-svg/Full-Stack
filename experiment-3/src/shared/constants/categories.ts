export const CATEGORIES = [
  'Lifestyle',
  'Beauty',
  'Travel',
  'Food',
  'Fashion',
  'Wellness',
  'Tech',
  'DIY & Crafts',
  'Photography',
  'Journal',
] as const;

export type Category = (typeof CATEGORIES)[number];
