import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { Input, Badge } from '@/shared/components';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  error?: string;
}

export function TagInput({ tags, onChange, error }: TagInputProps) {
  const [value, setValue] = useState('');

  function addTag() {
    const clean = value.trim().toLowerCase();
    if (clean && !tags.includes(clean)) {
      onChange([...tags, clean]);
    }
    setValue('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && !value && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-600 font-body">Tags</label>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} tone="purple">
            #{tag}
            <button type="button" onClick={() => onChange(tags.filter((t) => t !== tag))}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder="Type a tag and press Enter…"
      />
      {error && <span className="text-xs text-red-500 font-body">{error}</span>}
    </div>
  );
}
