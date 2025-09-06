
import React, { useState, useRef, useCallback } from 'react';
import { UploadIcon } from './Icons';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
}

export default function FileUpload({ onFileSelect }: FileUploadProps): React.JSX.Element {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setFileName(file.name);
        onFileSelect(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select an image file.");
      }
    }
  };

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
       setFileName(file.name);
       onFileSelect(file);
       const reader = new FileReader();
       reader.onloadend = () => {
           setPreview(reader.result as string);
       };
       reader.readAsDataURL(file);
    }
  }, [onFileSelect]);


  const handleClick = (): void => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-brand-primary transition-colors"
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      {preview ? (
        <div className="relative">
          <img src={preview} alt="Preview" className="mx-auto max-h-48 rounded-md" />
          <p className="text-sm text-slate-300 mt-2 truncate">{fileName}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <UploadIcon className="w-12 h-12 text-muted-dark mb-2" />
          <p className="text-slate-300">
            <span className="font-semibold text-brand-primary">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-muted-dark mt-1">PNG, JPG, GIF up to 10MB</p>
        </div>
      )}
    </div>
  );
}
