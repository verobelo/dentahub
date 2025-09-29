'use client';

import { convertFileToUrl } from '@/lib/utils';
import Image from 'next/image';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

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
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
            <p className='text-sm leading-[18px] font-normal'>
              <span className='text-green-500'>Click to upload</span> or drag
              and drop
            </p>
            <p>SVG, PNG, JPG, Gif (max 800 x 400)</p>
          </div>
        </>
      )}
    </div>
  );
}
