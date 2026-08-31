import { Component, OnInit } from '@angular/core';
import { IconsModule } from '../../../core/icons.module';

@Component({
  selector: 'app-our-story',
  imports: [IconsModule],
  templateUrl: './our-story.html',
  styleUrl: './our-story.css',
})
export class OurStory implements OnInit {

  // Variable para almacenar el número de años listo
  yearsOfExperience: number = 0;

  valores = [
    { icon: 'shield', label: 'Service Excellence' },
    { icon: 'lightbulb', label: 'Continuous Innovation' },
    { icon: 'users', label: 'Transparency & Trust' },
    { icon: 'heart', label: 'Passion for Tourism' },
    { icon: 'sparkles', label: 'Collaboration & Growth' },
  ];

  ngOnInit(): void {
    this.calculateExperience();
  }

  private calculateExperience(): void {
    const startYear = 2015;
    const startMonth = 0; // Enero
    const startDate = new Date(startYear, startMonth, 1);
    const today = new Date();

    let years = today.getFullYear() - startDate.getFullYear();
    const monthDiff = today.getMonth() - startDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < startDate.getDate())) {
      years--;
    }

    this.yearsOfExperience = years;
  }
}
