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
      title: 'Book With Confidence',
      description: 'We work with local tour and transportation providers and help you coordinate your reservation from start to finish.'
    },
    {
      icon: 'message-circle',
      title: 'Real Human Support',
      description: 'Have a question before booking? Contact us through WhatsApp and speak with someone about your reservation.'
    },
    {
      icon: 'credit-card',
      title: 'Pay on Arrival',
      description: 'For eligible experiences, you can request your reservation without paying by credit card in advance.'
    },
    {
      icon: 'headphonesIcon',
      title: 'Local Assistance',
      description: 'We are based in the Dominican Republic and can help you with excursions, transfers and other experiences during your trip.'
    }
  ];
}
