export interface Testimonial {
  rating: number;
  author: string;
  content: string;
}

export interface TestimonialSchema {
  "@context": string;
  "@type": string;
  review: Array<{
    "@type": string;
    reviewRating: {
      "@type": string;
      ratingValue: string;
    };
    author: {
      "@type": string;
      name: string;
    };
    reviewBody: string;
  }>;
}
