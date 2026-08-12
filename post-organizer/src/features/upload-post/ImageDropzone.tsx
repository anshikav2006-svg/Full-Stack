import { useCallback, useRef, useState } from 'react';
import type { DragEvent } from 'react';
import { ImagePlus, X, Upload } from 'lucide-react';
import { cn } from '@/shared/lib';

interface ImageDropzoneProps {
  value: string;
  onChange: (base64: string) => void;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ImageDropzone({ value, onChange }: ImageDropzoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      const file = files?.[0];
      if (!file || !file.type.startsWith('image/')) return;
      const base64 = await fileToBase64(file);
      onChange(base64);
    },
    [onChange],
  );

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }

  if (value) {
    return (
      <div className="relative overflow-hidden rounded-2xl border-2 border-babypink/40">
        <img src={value} alt="Cover preview" className="h-48 w-full object-cover" />
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-roseGold shadow-soft hover:bg-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn(
        'flex h-48 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed transition-colors',
        dragOver ? 'border-roseGold bg-babypink/20' : 'border-babypink/50 bg-white/40 hover:bg-babypink/10',
      )}
    >
      <div className="rounded-full bg-babypink/30 p-3 text-roseGold">
        {dragOver ? <Upload className="h-6 w-6" /> : <ImagePlus className="h-6 w-6" />}
      </div>
      <p className="text-sm font-semibold text-gray-500 font-body">Drag & drop a cover image</p>
      <p className="text-xs text-gray-400 font-body">or click to browse</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
