import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaQuemSomosNosComponent } from './pagina-quem-somos-nos.component';

describe('PaginaQuemSomosNosComponent', () => {
  let component: PaginaQuemSomosNosComponent;
  let fixture: ComponentFixture<PaginaQuemSomosNosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaQuemSomosNosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaQuemSomosNosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
