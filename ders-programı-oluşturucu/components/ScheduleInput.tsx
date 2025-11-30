import React, { useRef, useEffect, useState } from 'react';

interface ScheduleInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const ScheduleInput: React.FC<ScheduleInputProps> = ({ value, onChange, placeholder }) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (isEditing) {
      adjustHeight();
      textareaRef.current?.focus();
    }
  }, [isEditing, value]);

  // Updated to be much bigger and bolder (font-black, text-4xl)
  const textStyles = "text-3xl md:text-4xl font-black text-[#F5E9CF] text-center leading-none uppercase tracking-wide break-words w-full drop-shadow-md font-sans";

  return (
    <div 
      className="h-full w-full flex items-center justify-center px-2 pt-2 pb-6 cursor-pointer min-h-[inherit] relative"
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <textarea
          ref={textareaRef}
          rows={1}
          className={`${textStyles} bg-transparent placeholder:text-[#C6A667]/30 focus:outline-none resize-none overflow-hidden selection:bg-[#C6A667] selection:text-[#0E0D0B]`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setIsEditing(false)}
          placeholder={placeholder}
          spellCheck="false"
          style={{ height: 'auto' }}
        />
      ) : (
        <div className={`${textStyles} whitespace-pre-wrap select-none empty:after:content-['']`}>
          {value}
        </div>
      )}
    </div>
  );
};