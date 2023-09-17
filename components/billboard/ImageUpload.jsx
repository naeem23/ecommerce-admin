'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImagePlus, Trash } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

import { Button } from '@/components/ui/button';

const ImageUpload = ({ disabled, onChange, onRemove, value }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result) => {
        onChange(result.info.secure_url);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div
                        key={url}
                        className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
                    >
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                type="button"
                                onClick={() => onRemove(url)}
                                variant="destructive"
                                size="icon"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="image"
                            src={url}
                        />
                    </div>
                ))}
            </div>

            <CldUploadWidget onUpload={onUpload} uploadPreset="sjrx9zr3">
                {({ open }) => (
                    <Button
                        type="button"
                        disabled={disabled}
                        variant="secondary"
                        onClick={() => open?.()}
                    >
                        <ImagePlus className="mr-2 h-4 2-4" />
                        Upload a image
                    </Button>
                )}
            </CldUploadWidget>
        </>
    );
};

export default ImageUpload;
