import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvoutComponent } from './avout.component';

describe('AvoutComponent', () => {
  let component: AvoutComponent;
  let fixture: ComponentFixture<AvoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
