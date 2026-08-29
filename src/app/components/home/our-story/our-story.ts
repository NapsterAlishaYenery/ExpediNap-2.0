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

  calculateExperience(): void {
  // Según tu CV, en 2015 ya estabas en la "línea de fuego" del servicio al pasajero
  const startYear = 2015; 
  const startMonth = 0; // Enero (asumido para simplificar)
  const startDate = new Date(startYear, startMonth, 1);
  const today = new Date();
  
  let years = today.getFullYear() - startDate.getFullYear();
  
  // Verificamos si ya pasó el aniversario este año
  const monthDiff = today.getMonth() - startDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < startDate.getDate())) {
    years--;
  }

  this.yearsOfExperience = years;
}
}
