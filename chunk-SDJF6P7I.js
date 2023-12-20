import{Ga as o,Ka as h,La as p,Ma as c,Na as l,Oa as i,Pa as d,Va as w,Z as n,bb as m,qa as s,xa as r}from"./chunk-XYVOFFDO.js";function g(t,e){if(t&1&&d(0,"li",5),t&2){let f=e.$implicit;o("innerHTML",f,s)}}var u=(()=>{let e=class e{get rules(){return["<p>Each player will compete individually marking down their scores at the end of the round.<p>",`<p>After each player has completed their individual round, two brackets are generated based on the individual's score:</p>
      <p>
        <ul>
          <li>The first bracket contains the upper half of players (aka the winners)</li>
          <li>The second bracket contains the lower half of players (aka the losers)</li>
          <li class="fst-italic">* If there is an odd number of players, the winner bracket will always contain one extra player</li>
        </ul>
      </p>
      `,`<p>Each bracket will compete individually marking down their scores at the end of the round.</p>
        <p>
          <ul>
            <li>The player with the <span class="fw-bold">highest score in the winner's bracket</span> is the <span class="fw-bold">winner</span> of the individual round.</li> 
            <li>The player with the <span class="fw-bold">lowest score in the loser's bracket</span> is the 
              <span class="fw-bold">SquillyBowl Champ</span> (aka the ultimate loser)
            </li>
          </ul>
        </p>
        `,"<p>If you don't plan on playing in teams, then the game ends here with a definite SquillyBowl Champion. If you plan on team matches, continue to the next steps.</p>",`<p>Team brackets are generated in the following way:</p>
        <p>
          <ul>
            <li>The player with the <span class="fw-bold">highest score in the winner's bracket</span> will be teamed with the player with the <span class="fw-bold">lowest score in the loser's bracket</span> (aka the SquillyBowl Champ)</li>
            <li>The player with the next highest score in the winner's bracket is then teamed with the player with the next lowest score in the loser's bracket</li>
            <li>This process repeats until all players are assigned a partner</li>
            <li class="fst-italic">* If there is not an even number of players, a player from the loser's bracket will randomly be assigned to two teams</li>
          </ul>
        </p>
        `,"<p>Each team will then play a single round and record their scores at the end</p>",`<p>The players can choose to end the game here where the team with the highest score are the winners and the team with the lowest score are the <span class="fw-bold">Team SquillyBowl Champs</span>.</p> 
        <p class="fw-bold text-center">OR</p> 
        <p>the winning team and the losing team can agree to a single round winner takes all <span class="fw-bold">Ultimate SquillyBowl</span> match. Allowing the worst team to potentially redeem themselves
        </p>`]}};e.\u0275fac=function(a){return new(a||e)},e.\u0275cmp=n({type:e,selectors:[["app-rules"]],standalone:!0,features:[m],decls:10,vars:0,consts:[[1,"container","mt-5"],[1,"row"],[1,"col-12","text-center","text-success"],[1,"row","mt-5"],[1,"col-12"],[3,"innerHTML"]],template:function(a,b){a&1&&(l(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1"),w(4,"Squilly Bowl Rules:"),i()()(),l(5,"div",3)(6,"div",4)(7,"ol"),p(8,g,1,1,"li",5,h),i()()()()),a&2&&(r(8),c(b.rules))}});let t=e;return t})();var x=[{path:"",component:u}];export{x as default};
