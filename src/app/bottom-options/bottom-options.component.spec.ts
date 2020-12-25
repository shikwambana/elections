import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomOptionsComponent } from './bottom-options.component';

describe('BottomOptionsComponent', () => {
  let component: BottomOptionsComponent;
  let fixture: ComponentFixture<BottomOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
