'use client';

import { useState, useEffect, ChangeEvent, DragEvent } from 'react';

export function Upload() {
  const [dragOver, setDragOver] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const [previews, setPreviews] = useState<{ [key: string]: string | null }>({});
  const [uploadStatus, setUploadStatus] = useState<{ [key: string]: boolean }>({});
  const [fileNames, setFileNames] = useState<{ [key: string]: string }>({});

  // Define allowed file types and size limits
  const ALLOWED_FILE_TYPES: { [key: string]: string[] } = {
    'Background': ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    'Profile Avatar': ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    'Audio': ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/aac'],
    'Video': ['video/mp4', 'video/webm', 'video/ogg']
  };
  const MAX_FILE_SIZE_MB = 5; // 5 MB
  const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024; // in bytes

  useEffect(() => {
    const fetchPreviews = async () => {
      try {
        const responses = await Promise.all([
          fetch('/api/getuser/upload/background'),
          fetch('/api/getuser/upload/avatar'),
          fetch('/api/getuser/upload/audio')
        ]);

        const [backgroundResponse, avatarResponse, audioResponse] = responses;

        if (backgroundResponse.ok) {
          const backgroundResponseData = await backgroundResponse.json();
          if (backgroundResponseData.background) {
            setPreviews(prev => ({ ...prev, 'Background': `/uploads/background/${backgroundResponseData.background}` }));
            setFileNames(prev => ({ ...prev, 'Background': backgroundResponseData.background }));
          }
        }

        if (avatarResponse.ok) {
          const avatarResponseData = await avatarResponse.json();
          if (avatarResponseData.avatar) {
            setPreviews(prev => ({ ...prev, 'Profile Avatar': `/uploads/avatar/${avatarResponseData.avatar}` }));
            setFileNames(prev => ({ ...prev, 'Profile Avatar': avatarResponseData.avatar }));
          }
        }

        if (audioResponse.ok) {
          const audioData = await audioResponse.json();
          if (audioData.audio) {
            setPreviews(prev => ({ ...prev, 'Audio': `/uploads/audio/${audioData.audio}` }));
            setFileNames(prev => ({ ...prev, 'Audio': audioData.audio }));
          }
        }

      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchPreviews();
  }, []);

  const handleDrop = (e: DragEvent<HTMLDivElement>, label: string) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files[0]) {
      handleFile(files[0], label);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const validateFile = (file: File, label: string): string | null => {
    const allowedTypes = ALLOWED_FILE_TYPES[label];
    if (!allowedTypes.includes(file.type)) {
      return `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `File size exceeds ${MAX_FILE_SIZE_MB} MB`;
    }
    return null;
  };

  const handleFile = (file: File, label: string) => {
    const validationError = validateFile(file, label);
    if (validationError) {
      setMessage(validationError);
      return;
    }

    console.log(`Handling file: ${file.name} for label: ${label}`);
    const formData = new FormData();
    let endpoint = '';

    switch (label) {
      case 'Background':
        endpoint = '/api/customize/upload/background';
        formData.append('background', file);
        break;
      case 'Profile Avatar':
        endpoint = '/api/customize/upload/avatar';
        formData.append('avatar', file);
        break;
      case 'Audio':
        endpoint = '/api/customize/upload/audio';
        formData.append('audio', file);
        break;

      default:
        throw new Error('Unsupported file type');
    }

    setFileNames(prev => ({ ...prev, [label]: file.name }));

    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(`File loaded for label: ${label}`);
      if (label === 'Audio') {
        const mediaUrl = URL.createObjectURL(file);
        setPreviews(prev => ({ ...prev, [label]: mediaUrl }));
      } else {
        setPreviews(prev => ({ ...prev, [label]: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', endpoint, true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentCompleted = Math.round((event.loaded / event.total) * 100);
        setProgress(prev => ({ ...prev, [label]: percentCompleted }));
        console.log(`Upload progress for ${label}: ${percentCompleted}%`);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setMessage('File uploaded successfully');
        setUploadStatus(prev => ({ ...prev, [label]: true }));
        setProgress(prev => ({ ...prev, [label]: 0 }));
      } else {
        setMessage('Failed to upload file');
        setUploadStatus(prev => ({ ...prev, [label]: false }));
      }
    };

    xhr.onerror = () => {
      setMessage('Error occurred during upload');
      setProgress(prev => ({ ...prev, [label]: 0 }));
    };

    xhr.send(formData);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>, label: string) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0], label);
    }
  };

  const handleDelete = async (label: string) => {
    let endpoint = '';
    switch (label) {
      case 'Background':
        endpoint = '/api/customize/delete/background';
        break;
      case 'Profile Avatar':
        endpoint = '/api/customize/delete/avatar';
        break;
      case 'Audio':
        endpoint = '/api/customize/delete/audio';
        break;
      case 'Video':
        endpoint = '/api/customize/delete/video';
        break;
      default:
        throw new Error('Unsupported file type');
    }

    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPreviews(prev => ({ ...prev, [label]: null }));
        setFileNames(prev => ({ ...prev, [label]: '' }));
        setMessage('File deleted successfully');
        setUploadStatus(prev => ({ ...prev, [label]: false }));
      } else {
        const errorData = await response.json();
        setMessage(`Failed to delete file: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage('Failed to delete file');
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-2xl text-white">
      <h2 className="mb-4 text-2xl font-bold">Assets Uploader</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {['Background', 'Profile Avatar', 'Audio'].map((label) => (
          <div key={label} className="p-4 bg-gray-700 rounded-lg shadow-md relative">
            <h3 className="mb-2 text-lg font-semibold">{label}</h3>
            <div
              className={`relative flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-md ${
                dragOver ? 'border-blue-500' : 'border-gray-400'
              }`}
              onDrop={(e) => handleDrop(e, label)}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {previews[label] ? (
                label === 'Audio' ? (
                  <h1 className="text-lg font-semibold">{fileNames[label]}</h1>
                ) : (
                  <img
                    src={previews[label] || '/default-image.png'}
                    alt={`${label} preview`}
                    className="absolute inset-0 object-cover w-full h-full rounded-md"
                  />
                )
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full text-center">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-400">Click or Drag and drop a file</p>
                </div>
              )}
              <input
                type="file"
                className="absolute inset-0 opacity-0"
                onChange={(e) => handleFileInputChange(e, label)}
                multiple
              />
              {progress[label] > 0 && (
                <div className="absolute bottom-0 left-0 w-full bg-gray-700 rounded-b-md">
                  <div
                    className="text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-md"
                    style={{ width: `${progress[label]}%` }}
                  >
                    {progress[label]}%
                  </div>
                </div>
              )}
              {uploadStatus[label] && (
                <div className="absolute bottom-0 right-0 p-2">
                  <CheckIcon className="w-6 h-6 text-green-500" />
                </div>
              )}
              {previews[label] && (
                <button
                  type="button"
                  className="absolute top-2 right-2 p-2 bg-red-500 rounded-full hover:bg-red-600"
                  onClick={() => handleDelete(label)}
                >
                  <XIcon className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}

interface IconProps {
  className?: string;
}

function ImageIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function VideoIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function CheckIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17 4 12" />
    </svg>
  );
}

function XIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
