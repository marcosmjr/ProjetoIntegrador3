import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-banner-carrousel',
  imports: [NgbCarouselModule],
  templateUrl: './banner-carrousel.component.html',
  styleUrl: './banner-carrousel.component.css'
})
export class BannerCarrouselComponent {
  images = ['Banner_logo.jpg', 'fig1.jpg', 'fig2.jpg'].map((n) => `/img/banner/${n}`);


}