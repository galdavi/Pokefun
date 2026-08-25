import { ImageOffIcon, LoaderCircleIcon } from 'lucide-react'
import { useState} from 'react';

interface ImageWithLoaderProps {
    imageSrc: string;
    alt: string;
}
type ImageStatus = "loading" | "loaded" | "error";

export default function ImageWithLoader({ imageSrc, alt }: ImageWithLoaderProps) {
    const [status, setStatus] = useState<ImageStatus>("loading");
    const imageStyle = "h-auto w-full object-contain hover:scale-105 transition-transform duration-300 ease-in-out";
    const imageError = status === "error";
    const imageLoading = status === "loading";

    return (
        <div className="flex items-center justify-center w-full bg-card-secondary-background rounded-md">
            <img
                src={imageSrc} alt={alt}
                onError={() => setStatus("error")}
                onLoad={() => setStatus("loaded")}
                className={status === "loaded" ? imageStyle : `hidden`}
            />
            {imageError && <ImageOffIcon className="h-auto w-full max-w-3xs object-cover text-secondary" />}
            {imageLoading && <LoaderCircleIcon className="h-auto w-full max-w-3xs obect-cover animate-spin text-secondary" />}
        </div>
    );
}