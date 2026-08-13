import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Modal, Input, Textarea, Select, Button } from '@/shared/components';
import { ImageDropzone } from '@/features/upload-post';
import { CATEGORIES } from '@/shared/constants';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { createPost, updatePost } from '@/entities/post/model';
import type { Post } from '@/shared/types';
import { postFormSchema, type PostFormValues } from './schema';
import { TagInput } from './TagInput';

interface PostFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingPost?: Post | null;
}

const emptyValues: PostFormValues = {
  title: '',
  description: '',
  content: '',
  category: '',
  tags: [],
  coverImage: '',
  status: 'published',
};

export function PostFormModal({ isOpen, onClose, editingPost }: PostFormModalProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const isEditing = Boolean(editingPost);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (isOpen) {
      reset(
        editingPost
          ? {
              title: editingPost.title,
              description: editingPost.description,
              content: editingPost.content,
              category: editingPost.category,
              tags: editingPost.tags,
              coverImage: editingPost.coverImage,
              status: editingPost.status,
            }
          : emptyValues,
      );
    }
  }, [isOpen, editingPost, reset]);

  function onSubmit(values: PostFormValues, status: 'draft' | 'published') {
    if (!user) return;
    const payload = { ...values, status };

    if (isEditing && editingPost) {
      dispatch(updatePost({ id: editingPost.id, ...payload }));
      toast.success('Post updated beautifully! ✨');
    } else {
      dispatch(
        createPost({
          ...payload,
          author: user.name,
          authorId: user.id,
        }),
      );
      toast.success(status === 'published' ? 'Post published! 🌸' : 'Draft saved 💌');
    }
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Post' : 'Create New Post'} size="lg">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Controller
          name="coverImage"
          control={control}
          render={({ field }) => <ImageDropzone value={field.value} onChange={field.onChange} />}
        />
        {errors.coverImage && <p className="text-xs text-red-500 font-body">{errors.coverImage.message}</p>}

        <Input label="Title" placeholder="A dreamy title…" {...register('title')} error={errors.title?.message} />
        <Textarea
          label="Short Description"
          rows={2}
          placeholder="One or two sentences that make people want to click…"
          {...register('description')}
          error={errors.description?.message}
        />
        <Textarea
          label="Content"
          rows={5}
          placeholder="Write your full post here…"
          {...register('content')}
          error={errors.content?.message}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select label="Category" {...register('category')} error={errors.category?.message}>
            <option value="">Select a category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>

          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <TagInput tags={field.value} onChange={field.onChange} error={errors.tags?.message as string} />
            )}
          />
        </div>

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            isLoading={isSubmitting}
            onClick={handleSubmit((values) => onSubmit(values, 'draft'))}
          >
            Save Draft
          </Button>
          <Button type="button" isLoading={isSubmitting} onClick={handleSubmit((values) => onSubmit(values, 'published'))}>
            {isEditing ? 'Save Changes' : 'Publish Post'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
