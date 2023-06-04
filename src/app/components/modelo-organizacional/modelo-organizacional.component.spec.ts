import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloOrganizacionalComponent } from './modelo-organizacional.component';

describe('ModeloOrganizacionalComponent', () => {
  let component: ModeloOrganizacionalComponent;
  let fixture: ComponentFixture<ModeloOrganizacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeloOrganizacionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeloOrganizacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
