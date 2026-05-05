import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconsModule } from '../../../core/icons.module';
import { Button } from '../../ui/button/button';

interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  cta1: { label: string; href: string; icon: string };
  cta2: { label: string; href: string; icon: string };
}
@Component({
  selector: 'app-hero',
  imports: [CommonModule, RouterLink, IconsModule, Button],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit, OnDestroy {

  currentSlide = 0;
  private intervalId: any;

  slides: HeroSlide[] = [
    {
      id: 1,
      image: 'img/hero-beach.webp',
      title: 'Discover the Caribbean Paradise',
      subtitle: 'Exclusive excursions in Punta Cana and beyond',
      cta1: { label: 'View Excursions', href: '/excursions', icon: 'compass' },
      cta2: { label: 'Contact Us', href: '/contact', icon: 'phone' },
    },
    {
      id: 2,
      image: 'img/yacht-luxury.webp',
      title: 'Sail in Absolute Luxury',
      subtitle: 'Private yachts for unforgettable experiences',
      cta1: { label: 'View Excursions', href: '/excursions', icon: 'compass' },
      cta2: { label: 'Charter Yachts', href: '/yachts', icon: 'ship' },
    },
    {
      id: 3,
      image: 'img/saona-island.webp',
      title: 'Saona Island Awaits',
      subtitle: 'Crystal clear beaches and untouched nature',
      cta1: { label: 'View Excursions', href: '/excursions', icon: 'compass' },
      cta2: { label: 'Charter Yachts', href: '/yachts', icon: 'ship' },
    },
    {
      id: 4,
      image: 'img/airport-transfer.webp',
      title: 'Premium Airport Transfers',
      subtitle: 'Comfort and safety from the moment you land',
      cta1: { label: 'Book Transfer', href: '/transfers', icon: 'car' },
      cta2: { label: 'Contact Us', href: '/contact', icon: 'phone' },
    }
  ];

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 6000);
  }

  stopAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }
}
