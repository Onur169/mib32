import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThrowbacksComponent } from './throwbacks.component';

describe('ThrowbacksComponent', () => {
  let component: ThrowbacksComponent;
  let fixture: ComponentFixture<ThrowbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThrowbacksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThrowbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
