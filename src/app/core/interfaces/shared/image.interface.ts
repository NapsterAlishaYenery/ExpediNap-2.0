export interface ImageItem {
    public_id: string;
    url: string;
    thumbnailUrl: string;
    alt: string;
    mediaType: 'image' | 'video';
    width: number;
    height: number;
    format: string;
    order: number;
    duration: number | null;
}

export interface ImagesModel {
    main: ImageItem;
    gallery: ImageItem[];
}