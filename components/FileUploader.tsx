'use client';

import { convertFileToUrl } from '@/lib/utils';
import Image from 'next/image';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

interface FileUploaderProps {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
}

export default function FileUploader({ files, onChange }: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
    },
    [onChange]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/svg': ['.svg'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 2097152,
    onDropRejected: (fileRejections) => {
      const error = fileRejections[0]?.errors[0];
      if (error?.code === 'file-too-large') {
        toast.error('File is too large. Maximum size is 2MB.');
      } else if (error?.code === 'file-invalid-type') {
        toast.error(
          'File type not supported. Please use JPG, PNG, SVG or PDF.'
        );
      }
    },
  });

  return (
    <div {...getRootProps()} className='file-upload'>
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt='uploaded image'
          className='max-w-[400px] overflow-hidden object-cover'
        />
      ) : (
        <>
          <Image src='/upload.svg' width={40} height={40} alt='no upload' />
          <div className='flex flex-col justify-center gap-2 text-center text-dark-600'>
            <p className='text-base leading-[18px] font-normal'>
              <span className='text-green-500'>Click to upload</span> or drag
              and drop
            </p>
            <p className='text-sm'>
              For best results, use files under 2MB. iPhone users: select
              `Small` size when uploading photos.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
