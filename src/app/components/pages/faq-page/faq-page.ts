import { Component } from '@angular/core';
import { Accordeon } from '../../ui/accordeon/accordeon';
import { Button } from '../../ui/button/button';
import { itemCuestion } from '../../../core/interfaces/shared/shared.interface';

@Component({
  selector: 'app-faq-page',
  imports: [Accordeon, Button],
  templateUrl: './faq-page.html',
  styleUrl: './faq-page.css',
})
export class FaqPage {
  faqs: itemCuestion[] = [
    {
      question: "What is included in a private yacht rental?",
      answer: "All our rentals include a certified captain, fuel, coolers with ice, bottled water, and safety equipment. Depending on the package, they may also include snacks, alcoholic beverages, and snorkeling gear.",
      isOpen: false
    },
    {
      question: "How far in advance should I make my reservation?",
      answer: "We recommend booking at least 48 to 72 hours in advance to ensure availability, especially on weekends or during high season (December-April).",
      isOpen: false
    },
    {
      question: "What happens in case of bad weather?",
      answer: "Safety is our priority. If maritime authorities cancel departures due to weather conditions, we offer to reschedule the activity at no additional cost or a full refund of your reservation.",
      isOpen: false
    },
    {
      question: "Can I bring my own food and drinks to the yacht?",
      answer: "Of course! You can bring your own food and drinks. We provide the cooler with ice. We only ask to avoid glass containers on the deck area for safety reasons.",
      isOpen: false
    },
    {
      question: "What is the meeting point for the excursions?",
      answer: "The meeting point varies depending on the activity. Most of our yacht departures are from Cap Cana Marina or Casa de Campo. You will receive the exact location via WhatsApp after confirming your reservation.",
      isOpen: false
    },
    {
      question: "Do you have options for people with reduced mobility?",
      answer: "Some of our boats and land excursions are accessible. Please contact us before booking so we can assign you the most comfortable and safest option according to your needs.",
      isOpen: false
    },
    {
      question: "What is your cancellation policy?",
      answer: "Cancellations made more than 48 hours in advance receive a 100% refund. Between 24 and 48 hours, 50% is refunded. Cancellations made less than 24 hours in advance are non-refundable.",
      isOpen: false
    },
    {
      question: "Do children pay the same price as adults?",
      answer: "No, we offer special rates for children aged 3 to 12 on most of our excursions. Children under 2 usually go for free, but they must be reported in the reservation for insurance purposes.",
      isOpen: false
    },
    {
      question: "Is it necessary to know how to swim for snorkeling excursions?",
      answer: "It is not mandatory, as we provide life jackets and have expert guides who will assist you in the water at all times.",
      isOpen: false
    },
    {
      question: "Can I smoke on board the vessels?",
      answer: "Smoking is only allowed in designated areas by the captain (usually at the back of the boat) to ensure the safety and comfort of everyone.",
      isOpen: false
    },
    {
      question: "Are pets allowed on board?",
      answer: "We accept small pets on some specific private yachts with prior authorization and an additional deep cleaning fee.",
      isOpen: false
    },
    {
      question: "How can I pay for my reservation?",
      answer: "We accept credit/debit cards (Visa, Mastercard), local bank transfers, and cash payments on the day of the activity (with a prior reservation deposit).",
      isOpen: false
    },
    {
      question: "Is hotel transportation included?",
      answer: "Many of our excursions include round-trip transportation from hotels in the Punta Cana and Bávaro area. If you are in a remote area, we can coordinate it for an additional cost.",
      isOpen: false
    },
    {
      question: "What should I bring for a full-day excursion?",
      answer: "We recommend bringing biodegradable sunscreen, a swimsuit, a towel, a camera (preferably waterproof), sunglasses, and a comfortable change of clothes.",
      isOpen: false
    },
    {
      question: "Do you offer services for special events (birthdays, weddings)?",
      answer: "Of course! We are specialists in celebrations. We can include personalized decoration, premium catering, a DJ, and a professional photographer to make your event unforgettable.",
      isOpen: false
    }
  ];

  openWhatsApp() {
    const phoneNumber = "18098369303"; // Reemplaza con tu número real
    const message = "Hello ExpediNap! I have a question about the excursions.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
  }
}
