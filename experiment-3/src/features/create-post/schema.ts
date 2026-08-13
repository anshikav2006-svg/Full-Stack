import { z } from 'zod';

export const postFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(120, 'Title is too long'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(300, 'Keep it under 300 characters'),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  category: z.string().min(1, 'Please select a category'),
  tags: z.array(z.string()).min(1, 'Add at least one tag'),
  coverImage: z.string().min(1, 'Please add a cover image'),
  status: z.enum(['draft', 'published']),
});

export type PostFormValues = z.infer<typeof postFormSchema>;
