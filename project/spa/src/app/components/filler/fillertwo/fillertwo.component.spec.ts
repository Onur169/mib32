import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillertwoComponent } from './fillertwo.component';

describe('FillertwoComponent', () => {
  let component: FillertwoComponent;
  let fixture: ComponentFixture<FillertwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillertwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillertwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
