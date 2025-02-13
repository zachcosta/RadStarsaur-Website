import { Component } from '@angular/core';
import { LightboxModule, Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-gallery',
  imports: [LightboxModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  _albums: Array<any> = [
    {    
      src: "art/CrabQueen.png",
      caption: "Crab Queen",
      thumb: "art/CrabQueen.png"
    },
    {    
      src: "art/Spinosaurus2024.png",
      caption: "Spinosaurus",
      thumb: "art/Spinosaurus2024.png"
    },
  ];
  constructor(private _lightbox: Lightbox) {
    for (let i = 1; i <= 4; i++) {
      const src = 'demo/img/image' + i + '.jpg';
      const caption = 'Image ' + i + ' caption here';
      const thumb = 'demo/img/image' + i + '-thumb.jpg';
      const album = {
         src: src,
         caption: caption,
         thumb: thumb
      };

      this._albums.push(album);
    }
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._albums, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
}
