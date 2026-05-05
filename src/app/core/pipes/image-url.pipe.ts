import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environment/environment'; 

@Pipe({
  name: 'imageUrl',
  standalone: true
})
export class ImageUrlPipe implements PipeTransform {
  
  private readonly baseUrl = environment.imageBaseUrl;

  transform(imageName: string | undefined): string {
    if (!imageName) {
      return '/img/yacht-luxury.webp'; 
    }
    
    return `${this.baseUrl}${imageName}`;
  }
}