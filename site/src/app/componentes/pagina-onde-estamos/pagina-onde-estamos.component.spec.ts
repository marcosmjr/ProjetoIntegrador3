import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaOndeEstamosComponent } from './pagina-onde-estamos.component';

describe('PaginaOndeEstamosComponent', () => {
  let component: PaginaOndeEstamosComponent;
  let fixture: ComponentFixture<PaginaOndeEstamosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaOndeEstamosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaOndeEstamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
