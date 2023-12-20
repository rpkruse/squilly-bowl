import { TestBed } from '@angular/core/testing';

import { GameGeneratorService } from './game-generator.service';

describe('GameGeneratorService', () => {
  let service: GameGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
