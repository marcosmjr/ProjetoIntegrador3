import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCarrouselComponent } from './banner-carrousel.component';

describe('BannerCarrouselComponent', () => {
  let component: BannerCarrouselComponent;
  let fixture: ComponentFixture<BannerCarrouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerCarrouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
