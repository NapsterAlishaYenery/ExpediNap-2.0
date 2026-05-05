import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ImageUrlPipe } from '../../../core/pipes/image-url.pipe';
import { CommonModule } from '@angular/common';
import { GalleryImage } from '../../../core/interfaces/shared/shared.interface';


@Component({
  selector: 'app-image-gallery',
  imports: [CommonModule, ImageUrlPipe],
  templateUrl: './image-gallery.html',
  styleUrl: './image-gallery.css',
})
export class ImageGallery implements OnInit {
  @Input() images!: { main: GalleryImage, gallery: GalleryImage[] };

  selectedImage!: GalleryImage;

  ngOnInit() {
    this.selectedImage = this.images.main;
  }

  selectImage(img: GalleryImage) {
    this.selectedImage = img;
  }

  // Dentro de tu clase:
  @ViewChild('carousel') carousel!: ElementRef;

  scrollGallery(direction: number) {
    const scrollAmount = 300; // Ajusta según qué tanto quieras que se mueva
    this.carousel.nativeElement.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  }
}
