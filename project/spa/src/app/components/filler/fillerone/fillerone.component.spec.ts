import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilleroneComponent } from './fillerone.component';

describe('FilleroneComponent', () => {
  let component: FilleroneComponent;
  let fixture: ComponentFixture<FilleroneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilleroneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilleroneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
