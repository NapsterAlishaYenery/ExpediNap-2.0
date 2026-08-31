import { Component } from '@angular/core';
import { IconsModule } from '../../../core/icons.module';

@Component({
  selector: 'app-why-choose-us',
  imports: [IconsModule],
  templateUrl: './why-choose-us.html',
  styleUrl: './why-choose-us.css',
})
export class WhyChooseUs {
  benefits = [
    {
      icon: 'shield',
      title: 'Guaranteed Safety',
      description: 'All our tours include comprehensive insurance and certified guides for your peace of mind.'
    },
    {
      icon: 'dollar-sign',
      title: 'Best Price Guarantee',
      description: 'We offer the most competitive rates in the market without sacrificing service quality.'
    },
    {
      icon: 'award',
      title: 'Premium Quality',
      description: 'State-of-the-art equipment and luxury vessels for unforgettable experiences.'
    },
    {
      icon: 'headphonesIcon',
      title: '24/7 Support',
      description: 'Personalized assistance before, during, and after your excursion. Always available.'
    }
  ];
}
