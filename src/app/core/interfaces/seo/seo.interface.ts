export interface SeoConfig {
    title: string;
    description: string;
    url: string;
    keywords?: string[];
    image?: string;
    type?: 'website' | 'article';
    author?: string;
    robots?: string;
}