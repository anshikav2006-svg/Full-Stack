export type PostStatus = 'published' | 'draft';

export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  authorId: string;
  coverImage: string;
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
  likes: number;
  views: number;
}

export type SortOption = 'newest' | 'oldest' | 'mostViewed' | 'mostLiked' | 'alphabetical';

export interface PostFilters {
  category: string | 'all';
  status: PostStatus | 'all';
  author: string | 'all';
}
