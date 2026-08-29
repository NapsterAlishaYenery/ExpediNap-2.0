import { Component, inject, OnInit } from '@angular/core';
import { Hero } from './hero/hero';
import { FeaturedExcursions } from "./featured-excursions/featured-excursions";
import { FeaturedYachts } from "./featured-yachts/featured-yachts";
import { WhyChooseUs } from "./why-choose-us/why-choose-us";
import { OurStory } from "./our-story/our-story";
import { PropuestaValor } from './propuesta-valor/propuesta-valor';
import { ReviewSection } from './review-section/review-section';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  imports: [Hero, FeaturedExcursions, FeaturedYachts, WhyChooseUs, OurStory, PropuestaValor, ReviewSection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private titleService = inject(Title)
  private metaService = inject(Meta)

  ngOnInit(): void {
    // 🔥 Título de la página
    this.titleService.setTitle('ExpediNap | Punta Cana Excursions & Private Yacht Rentals');

    // 🔥 Meta tags
    this.metaService.updateTag({ name: 'description', content: 'Book the best excursions in Punta Cana with ExpediNap. Discover tours, adventures, and unforgettable experiences in the Dominican Republic.' });
    this.metaService.updateTag({ name: 'keywords', content: 'Punta Cana excursions, tours Dominican Republic, things to do Punta Cana' });
  }
}
