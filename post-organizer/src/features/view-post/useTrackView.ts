import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@/shared/hooks';
import { incrementViews, toggleLike } from '@/entities/post/model';

/** Registers a single view increment per post visit (per component mount). */
export function useTrackView(postId: string | undefined) {
  const dispatch = useAppDispatch();
  const tracked = useRef<string | null>(null);

  useEffect(() => {
    if (!postId || tracked.current === postId) return;
    tracked.current = postId;
    dispatch(incrementViews(postId));
  }, [postId, dispatch]);
}

export function useLikePost() {
  const dispatch = useAppDispatch();
  return (postId: string) => dispatch(toggleLike(postId));
}
