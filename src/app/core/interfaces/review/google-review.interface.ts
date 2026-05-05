export interface GoogleReviewData {
  rating: number;
  totalReviews: number;
  businessName: string;
  reviews: GoogleReviewItem[];
}

export interface GoogleReviewItem {
  author: string;
  photo: string;
  rating: number;
  text: string;
  relativeTime: string;
  publishDate: string;
}