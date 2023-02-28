import { Component, OnInit } from '@angular/core';
import { Product } from './Model/product';
import { product } from './Core/ProductSample';
import { ImageProcessingService } from './Core/image-processing.service';
import { FileHandle } from './Model/file-handle';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ImageDisplay';
  sampleProduct: Product = product;
  image: FileHandle;
  imageURL: SafeUrl;
  constructor(private imageProcessingService: ImageProcessingService) {
    console.log(this.sampleProduct);
    this.image = this.imageProcessingService.createImage(product);
    this.imageURL = this.image.url;
    console.log(this.image);
  }
}
