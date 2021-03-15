import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillerfourComponent } from './fillerfour.component';

describe('FillerfourComponent', () => {
  let component: FillerfourComponent;
  let fixture: ComponentFixture<FillerfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillerfourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillerfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
