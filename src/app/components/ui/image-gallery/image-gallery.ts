import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ImageItem, ImagesModel } from '../../../core/interfaces/shared/image.interface';
import { IconsModule } from '../../../core/icons.module';


@Component({
  selector: 'app-image-gallery',
  imports: [IconsModule],
  templateUrl: './image-gallery.html',
  styleUrl: './image-gallery.css',
})
export class ImageGallery implements OnChanges {
 @Input({ required: true }) images!: ImagesModel;

  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;

  selectedImage!: ImageItem;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'] && this.images?.main) {
      this.selectedImage = this.images.main;
    }
  }

  selectImage(img: ImageItem): void {
    this.selectedImage = img;
  }

  scrollGallery(direction: number): void {
    const scrollAmount = 280;
    if (this.carousel) {
      this.carousel.nativeElement.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth',
      });
    }
  }

  get allImages(): ImageItem[] {
    if (!this.images) return [];
    return [this.images.main, ...(this.images.gallery || [])];
  }
}
