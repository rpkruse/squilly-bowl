import { Component, Input } from '@angular/core';
import { Round } from '../../../models/round';
import { Constants, SessionStorageKeys } from '../../../shared/constants';
import { StorageService } from '../../../services/storage.service';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [NgbAccordionModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  private _roundInfo!: Round[];
  @Input() set roundInfo (value: Round[]) {
    this._roundInfo = value;

    const allRounds: Round[] | null = this.storageService.getValue<Round[]>(SessionStorageKeys.ROUNDS);

    if (allRounds) {
      this._roundInfo = allRounds;
    }
  }
  get roundInfo(): Round[] { return this._roundInfo; }

  constructor(private storageService: StorageService) { }

  roundTitle(index: number): string {
    return Constants.roundTitles[index];
  }

}
