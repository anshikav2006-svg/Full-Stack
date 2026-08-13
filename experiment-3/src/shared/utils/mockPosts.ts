import type { Post } from '@/shared/types';
import { CATEGORIES } from '@/shared/constants';
import { generateId } from '@/shared/lib';

const AUTHORS = [
  'Aria Blossom',
  'Rosalie Moon',
  'Willow Grace',
  'Ivy Sinclair',
  'Luna Rivers',
  'Bella Hart',
  'Clover Sage',
  'Peony West',
];

const ADJECTIVES = [
  'Dreamy',
  'Cozy',
  'Whimsical',
  'Golden Hour',
  'Pastel',
  'Effortless',
  'Minimalist',
  'Sparkling',
  'Soft-Girl',
  'Sunday',
];

const TOPICS = [
  'Skincare Routine',
  'Travel Diaries',
  'Coffee Shop Guide',
  'Room Makeover',
  'Capsule Wardrobe',
  'Journaling Habits',
  'Recipe Roundup',
  'Photography Tips',
  'Self-Care Sunday',
  'Vision Board Ideas',
];

const IMAGE_SEEDS = [
  'flowers', 'coffee', 'travel', 'fashion', 'skincare', 'journal',
  'aesthetic', 'pastel', 'brunch', 'sunset',
];

function randomFrom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomTags(): string[] {
  const pool = ['aesthetic', 'pastel', 'cute', 'inspo', 'girly', 'selfcare', 'cozy', 'trending', 'diy', 'mood'];
  const count = 2 + Math.floor(Math.random() * 3);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function randomDateWithinDays(days: number): string {
  const now = Date.now();
  const past = now - Math.floor(Math.random() * days) * 24 * 60 * 60 * 1000;
  return new Date(past).toISOString();
}

export function generateMockPosts(count = 50): Post[] {
  const posts: Post[] = [];
  for (let i = 0; i < count; i++) {
    const title = `${randomFrom(ADJECTIVES)} ${randomFrom(TOPICS)}`;
    const createdAt = randomDateWithinDays(180);
    const updatedAt = createdAt;
    const author = randomFrom(AUTHORS);
    const seed = randomFrom(IMAGE_SEEDS) + '-' + (i + 1);
    posts.push({
      id: generateId('post'),
      title,
      description: `A ${title.toLowerCase()} curated just for you — full of little details, soft tones, and inspiration to brighten your day.`,
      content: `${title} is all about finding beauty in the everyday. In this post we explore tips, tricks, and cozy moments that make life feel a little more curated and aesthetic. From the small rituals to the big transformations, this is your guide to embracing the ${randomFrom(ADJECTIVES).toLowerCase()} lifestyle.\n\nWhether you're just getting started or looking for fresh inspiration, there's something here for everyone who loves soft colors, gentle routines, and a touch of sparkle in daily life.`,
      category: randomFrom(CATEGORIES),
      tags: randomTags(),
      author,
      authorId: author.toLowerCase().replace(/\s+/g, '-'),
      coverImage: `https://picsum.photos/seed/${seed}/800/600`,
      status: Math.random() > 0.15 ? 'published' : 'draft',
      createdAt,
      updatedAt,
      likes: Math.floor(Math.random() * 500),
      views: Math.floor(Math.random() * 5000),
    });
  }
  return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
