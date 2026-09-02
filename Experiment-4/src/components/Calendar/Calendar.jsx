import React, { useMemo, useState, useCallback } from 'react';
import { format, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from 'date-fns';
import CalendarEvent from '../CalendarEvent/CalendarEvent';
import { getMonthGrid, getPostsForDate } from '../../utils/dateUtils';
import './Calendar.css';

/**
 * A lightweight, dependency-free calendar. A real project could swap this
 * out for FullCalendar's <FullCalendar /> component; the important part
 * for this course is the DATA FLOW — mapping Redux posts into calendar
 * cells and handling drag-and-drop — not which calendar library renders
 * the grid. Keeping this custom also avoids pulling in a large third-party
 * bundle for a student project.
 */
function Calendar({ posts, onEventClick, onDateClick, onEventDrop }) {
  const [view, setView] = useState('month'); // 'month' | 'week' | 'day'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dragOverDate, setDragOverDate] = useState(null);

  const goToday = useCallback(() => setCurrentDate(new Date()), []);

  const goPrev = useCallback(() => {
    setCurrentDate((d) => {
      if (view === 'month') return subMonths(d, 1);
      if (view === 'week') return subWeeks(d, 1);
      return subDays(d, 1);
    });
  }, [view]);

  const goNext = useCallback(() => {
    setCurrentDate((d) => {
      if (view === 'month') return addMonths(d, 1);
      if (view === 'week') return addWeeks(d, 1);
      return addDays(d, 1);
    });
  }, [view]);

  // Recomputed only when currentDate or view changes -- building a 42-cell
  // grid + per-day filtering is a meaningful cost worth memoizing once the
  // dataset is in the hundreds of posts.
  const days = useMemo(() => {
    if (view === 'month') return getMonthGrid(currentDate);
    if (view === 'week') {
      const start = subDays(currentDate, currentDate.getDay());
      return Array.from({ length: 7 }, (_, i) => addDays(start, i));
    }
    return [currentDate];
  }, [currentDate, view]);

  const handleDragStart = useCallback((e, postId) => {
    e.dataTransfer.setData('text/post-id', postId);
  }, []);

  const handleDrop = useCallback(
    (e, date) => {
      e.preventDefault();
      setDragOverDate(null);
      const postId = e.dataTransfer.getData('text/post-id');
      if (!postId) return;
      onEventDrop(postId, date);
    },
    [onEventDrop]
  );

  return (
    <div className="calendar">
      <div className="calendar__toolbar">
        <div className="calendar__nav">
          <button type="button" onClick={goPrev} aria-label="Previous">
            ‹
          </button>
          <button type="button" onClick={goToday}>
            Today
          </button>
          <button type="button" onClick={goNext} aria-label="Next">
            ›
          </button>
          <span className="calendar__label">{format(currentDate, 'MMMM yyyy')}</span>
        </div>
        <div className="calendar__view-switch" role="group" aria-label="Calendar view">
          {['month', 'week', 'day'].map((v) => (
            <button
              key={v}
              type="button"
              className={v === view ? 'active' : ''}
              onClick={() => setView(v)}
              aria-pressed={v === view}
            >
              {v[0].toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className={`calendar__grid calendar__grid--${view}`}>
        {days.map((day) => {
          const dayPosts = getPostsForDate(posts, day);
          const isOutsideMonth = view === 'month' && day.getMonth() !== currentDate.getMonth();
          const isDragOver = dragOverDate && format(dragOverDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');

          return (
            <div
              key={day.toISOString()}
              className={`calendar__cell${isOutsideMonth ? ' calendar__cell--muted' : ''}${
                isDragOver ? ' calendar__cell--dragover' : ''
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverDate(day);
              }}
              onDragLeave={() => setDragOverDate(null)}
              onDrop={(e) => handleDrop(e, day)}
              onClick={() => onDateClick(day)}
              role="button"
              tabIndex={0}
              aria-label={`${format(day, 'PPPP')}, ${dayPosts.length} posts`}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onDateClick(day);
              }}
            >
              <span className="calendar__date">{format(day, 'd')}</span>
              <div className="calendar__events">
                {dayPosts.map((post) => (
                  <CalendarEvent
                    key={post.id}
                    post={post}
                    onClick={onEventClick}
                    draggable
                    onDragStart={handleDragStart}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
