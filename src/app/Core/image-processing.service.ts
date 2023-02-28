import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../Model/file-handle';
import { Product } from '../Model/product';

@Injectable({
  providedIn: 'root',
})
export class ImageProcessingService {
  //DomSanitizer helps preventing Cross Site Scripting Security bugs (XSS) by sanitizing values to be safe to use in the different DOM contexts.
  constructor(private sanitizer: DomSanitizer) {}

  public createImage(product: Product) {
    const productImage: any = product.image;

    const imageBlob = this.dataURItoBlob(productImage, product.imageType);

    const imageFile = new File([imageBlob], productImage, {
      type: product.imageType,
    });

    const productImageToFileHandle: FileHandle = {
      file: imageFile,
      url: this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(imageFile)
      ),
    };
    return productImageToFileHandle;
  }

  public dataURItoBlob(picBytes: string, imageType: string) {
    //Decodes a string of Base64-encoded data into bytes, and encodes those bytes into a string using Latin-1 (ISO-8859-1).
    const byteString = window.atob(picBytes);
    //Represents a raw buffer of binary data, which is used to store data for the different typed arrays. ArrayBuffers cannot be read from or written to directly, but can be passed to a typed array or DataView Object to interpret the raw buffer as needed.
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    //A file-like object of immutable, raw data. Blobs represent data that isn't necessarily in a JavaScript-native format. The File interface is based on Blob, inheriting blob functionality and expanding it to support files on the user's system.
    const blob = new Blob([int8Array], { type: imageType });
    return blob;
  }
}
