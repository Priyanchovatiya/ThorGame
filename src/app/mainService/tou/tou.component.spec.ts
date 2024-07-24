import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouComponent } from './tou.component';

describe('TouComponent', () => {
  let component: TouComponent;
  let fixture: ComponentFixture<TouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
