import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillersixComponent } from './fillersix.component';

describe('FillersixComponent', () => {
  let component: FillersixComponent;
  let fixture: ComponentFixture<FillersixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillersixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillersixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
