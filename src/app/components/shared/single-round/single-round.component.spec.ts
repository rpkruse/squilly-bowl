import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstRoundComponent } from './single-round.component';

describe('FirstRoundComponent', () => {
  let component: FirstRoundComponent;
  let fixture: ComponentFixture<FirstRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstRoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirstRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
