// Editing reuses the same PostFormModal used for creation (see create-post feature),
// keeping the form logic in one place while this slice exposes the edit-specific intent.
export { PostFormModal as EditPostModal } from '@/features/create-post';
