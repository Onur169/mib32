import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillerfiveComponent } from './fillerfive.component';

describe('FillerfiveComponent', () => {
  let component: FillerfiveComponent;
  let fixture: ComponentFixture<FillerfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillerfiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillerfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
