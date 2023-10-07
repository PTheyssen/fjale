
import { Component } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent {
  currentLetter: number = 0;
  currentWord: number = 0;
  words: Array<Array<string>> = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];

  // gets button click type
  // - updates game board
  onKeyClick(key: string) {
    // this word is locked
    if (this.currentLetter >= 5) {
      if (this.currentWord >= 4) {
        this.finishGame();
        return;
      }
      this.currentWord++;
      this.currentLetter = 0;
    }
    this.words[this.currentWord][this.currentLetter] = key;
    this.currentLetter++;
    // console.log(this.words);
    // console.log(this.currentLetter);
  }

  finishGame() {
    console.log("Game is finished!")
  }
}
