import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageItem, ImagesModel } from '../../../core/interfaces/shared/image.interface';


@Component({
  selector: 'app-image-gallery',
  imports: [CommonModule],
  templateUrl: './image-gallery.html',
  styleUrl: './image-gallery.css',
})
export class ImageGallery implements OnInit {
  @Input() images!: ImagesModel; // ✅ Usar ImagesModel

  selectedImage!: ImageItem; // ✅ Usar ImageItem

  ngOnInit() {
    this.selectedImage = this.images.main;
  }

  selectImage(img: ImageItem) { // ✅ Usar ImageItem
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
