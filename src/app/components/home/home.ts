import { Component, inject, OnInit } from '@angular/core';
import { Hero } from './hero/hero';
import { FeaturedExcursions } from "./featured-excursions/featured-excursions";
import { FeaturedYachts } from "./featured-yachts/featured-yachts";
import { WhyChooseUs } from "./why-choose-us/why-choose-us";
import { OurStory } from "./our-story/our-story";
import { PropuestaValor } from './propuesta-valor/propuesta-valor';
import { ReviewSection } from './review-section/review-section';
import { SeoService } from '../../core/services/seo/seo.service';


@Component({
  selector: 'app-home',
  imports: [Hero, FeaturedExcursions, FeaturedYachts, WhyChooseUs, OurStory, PropuestaValor, ReviewSection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'ExpediNap | Punta Cana Excursions & Private Yacht Rentals',
      description: 'Book the best excursions in Punta Cana with ExpediNap. Discover tours, private yacht charters, adventures, and unforgettable experiences in the Dominican Republic.',
      keywords: ['Punta Cana excursions', 'tours Dominican Republic', 'things to do Punta Cana', 'private yacht rentals', 'ExpediNap'],
      url: 'https://www.expedinap.com/',
      image: 'https://res.cloudinary.com/dfwpolska/image/upload/v1776901038/social-imag.webp'
    });
  }
}
