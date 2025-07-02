
import { useState, useRef } from 'react';
import { Upload, User, Camera } from 'lucide-react';

export const ProfilePhoto = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <div
        className={`relative w-48 h-48 rounded-full border-4 transition-all duration-300 cursor-pointer overflow-hidden ${
          isDragging 
            ? 'border-blue-400 bg-blue-400/10 scale-105' 
            : 'border-purple-500/50 hover:border-purple-400 bg-slate-800/30 hover:bg-slate-700/30'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        {profileImage ? (
          <>
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            {isDragging ? (
              <Upload className="w-12 h-12 text-blue-400 mb-2" />
            ) : (
              <User className="w-16 h-16 text-slate-400 mb-2" />
            )}
            <p className="text-slate-300 text-sm text-center px-4">
              {isDragging ? 'Drop photo here' : 'Click or drag to add your photo'}
            </p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
      {profileImage && (
        <p className="text-slate-400 text-sm mt-2">Click photo to change</p>
      )}
    </div>
  );
};
