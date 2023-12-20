import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRoundComponent } from './team-round.component';

describe('TeamRoundComponent', () => {
  let component: TeamRoundComponent;
  let fixture: ComponentFixture<TeamRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamRoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
