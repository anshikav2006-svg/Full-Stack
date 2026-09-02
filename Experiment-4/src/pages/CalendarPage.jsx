import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Calendar from '../components/Calendar/Calendar';
import PostModal from '../components/PostModal/PostModal';
import LoadingState from '../components/LoadingState/LoadingState';
import { fetchPosts, movePost } from '../features/posts/postSlice';
import { showToast } from '../features/ui/uiSlice';
import { selectAllPosts, selectPostsLoading } from '../features/posts/postSelectors';

/**
 * Maps Redux posts into calendar events and owns the drag-and-drop
 * scheduling flow described in the spec:
 *   1. get the post id from the drag event
 *   2. get the new date
 *   3. dispatch movePost to update Redux (immutably, via Immer)
 *   4. show a toast confirming the change
 */
function CalendarPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector(selectAllPosts);
  const loading = useSelector(selectPostsLoading);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleEventClick = useCallback((postId) => {
    setSelectedPostId(postId);
  }, []);

  const handleDateClick = useCallback(
    (date) => {
      navigate('/posts/create', { state: { presetDate: date.toISOString() } });
    },
    [navigate]
  );

  const handleEventDrop = useCallback(
    (postId, newDate) => {
      const post = posts.find((p) => p.id === postId);
      if (!post) return;

      const original = new Date(post.scheduledAt);
      const newScheduledAt = new Date(newDate);
      newScheduledAt.setHours(original.getHours(), original.getMinutes());

      dispatch(movePost({ id: postId, newScheduledAt: newScheduledAt.toISOString() }));
      dispatch(showToast({ message: `"${post.title}" rescheduled.`, type: 'success' }));
    },
    [dispatch, posts]
  );

  const selectedPost = posts.find((p) => p.id === selectedPostId) || null;

  if (loading) return <LoadingState message="Loading calendar…" />;

  return (
    <div className="page">
      <h1>Calendar</h1>
      <Calendar
        posts={posts}
        onEventClick={handleEventClick}
        onDateClick={handleDateClick}
        onEventDrop={handleEventDrop}
      />
      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPostId(null)}
          onEdit={(id) => navigate(`/posts/${id}/edit`)}
        />
      )}
    </div>
  );
}

export default CalendarPage;
