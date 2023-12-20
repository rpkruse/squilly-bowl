import { Component } from '@angular/core';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.scss'
})
export class RulesComponent {
   get rules(): string[] {
    return [
      `<p>Each player will compete individually marking down their scores at the end of the round.<p>`,

      `<p>After each player has completed their individual round, two brackets are generated based on the individual's score:</p>
      <p>
        <ul>
          <li>The first bracket contains the upper half of players (aka the winners)</li>
          <li>The second bracket contains the lower half of players (aka the losers)</li>
          <li class="fst-italic">* If there is an odd number of players, the winner bracket will always contain one extra player</li>
        </ul>
      </p>
      `,

      `<p>Each bracket will compete individually marking down their scores at the end of the round.</p>
        <p>
          <ul>
            <li>The player with the <span class="fw-bold">highest score in the winner's bracket</span> is the <span class="fw-bold">winner</span> of the individual round.</li> 
            <li>The player with the <span class="fw-bold">lowest score in the loser's bracket</span> is the 
              <span class="fw-bold">SquillyBowl Champ</span> (aka the ultimate loser)
            </li>
          </ul>
        </p>
        `,

        `<p>If you don't plan on playing in teams, then the game ends here with a definite SquillyBowl Champion. If you plan on team matches, continue to the next steps.</p>`,

        `<p>Team brackets are generated in the following way:</p>
        <p>
          <ul>
            <li>The player with the <span class="fw-bold">highest score in the winner's bracket</span> will be teamed with the player with the <span class="fw-bold">lowest score in the loser's bracket</span> (aka the SquillyBowl Champ)</li>
            <li>The player with the next highest score in the winner's bracket is then teamed with the player with the next lowest score in the loser's bracket</li>
            <li>This process repeats until all players are assigned a partner</li>
            <li class="fst-italic">* If there is not an even number of players, a player from the loser's bracket will randomly be assigned to two teams</li>
          </ul>
        </p>
        `,

        `<p>Each team will then play a single round and record their scores at the end</p>`,

        `<p>The players can choose to end the game here where the team with the highest score are the winners and the team with the lowest score are the <span class="fw-bold">Team SquillyBowl Champs</span>.</p> 
        <p class="fw-bold text-center">OR</p> 
        <p>the winning team and the losing team can agree to a single round winner takes all <span class="fw-bold">Ultimate SquillyBowl</span> match. Allowing the worst team to potentially redeem themselves
        </p>`
    ]
   }
}
