import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillerthreeComponent } from './fillerthree.component';

describe('FillerthreeComponent', () => {
  let component: FillerthreeComponent;
  let fixture: ComponentFixture<FillerthreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillerthreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillerthreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
