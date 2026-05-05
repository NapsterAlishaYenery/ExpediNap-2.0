import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { FeaturedExcursions } from "./featured-excursions/featured-excursions";
import { FeaturedYachts } from "./featured-yachts/featured-yachts";
import { WhyChooseUs } from "./why-choose-us/why-choose-us";
import { OurStory } from "./our-story/our-story";
import { PropuestaValor } from './propuesta-valor/propuesta-valor';
import { ReviewSection } from './review-section/review-section';


@Component({
  selector: 'app-home',
  imports: [Hero, FeaturedExcursions, FeaturedYachts, WhyChooseUs, OurStory, PropuestaValor, ReviewSection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  
}
