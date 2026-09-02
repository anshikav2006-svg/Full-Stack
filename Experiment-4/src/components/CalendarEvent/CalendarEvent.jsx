import React from 'react';
import { formatTime } from '../../utils/dateUtils';
import { STATUS_COLORS } from '../../utils/postUtils';
import './CalendarEvent.css';

/**
 * CalendarEvent can appear dozens of times per month view render. It is
 * memoized for the same reason PostCard is: dragging one event re-renders
 * the Calendar grid, and without memo every unrelated event chip would
 * re-render too.
 */
function CalendarEvent({ post, onClick, draggable, onDragStart }) {
  const color = STATUS_COLORS[post.status] || '#64748b';

  return (
    <button
      type="button"
      className="calendar-event"
      style={{ borderLeftColor: color }}
      onClick={() => onClick(post.id)}
      draggable={draggable}
      onDragStart={(e) => onDragStart(e, post.id)}
      aria-label={`${post.title}, ${post.platform}, ${post.status}, ${formatTime(
        post.scheduledAt
      )}`}
    >
      <span className="calendar-event__time">{formatTime(post.scheduledAt)}</span>
      <span className="calendar-event__title">{post.title}</span>
    </button>
  );
}

export default React.memo(CalendarEvent);
