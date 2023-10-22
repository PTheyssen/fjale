import { Component } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent {
  gameFinished: boolean = false;
  solutionWord: string = '';
  wordList: Array<string> = [];
  currentLetter: number = 0;
  currentWord: number = 0;
  gameBoard: Array<Array<string>> = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];

  async ngOnInit() {
    await fetch('assets/fjale.txt')
      .then((response) => response.text())
      .then((text) => (this.wordList = text.split('\n')));
    this.solutionWord =
      this.wordList[Math.floor(Math.random() * this.wordList.length)];
    console.log('Solution word: ' + this.solutionWord);
  }

  onKeyClick(key: string) {
    if (!this.gameFinished) {
      this.gameBoard[this.currentWord][this.currentLetter] = key;
      this.currentLetter++;
      if (this.currentLetter >= 5) {
        console.log();
        let submittedWord: string = this.gameBoard[this.currentWord]
          .join('')
          .toLowerCase();
        this.checkWord(this.solutionWord, submittedWord);
        if (this.currentWord >= 4) {
          this.finishGame();
          return;
        }
        this.currentWord++;
        this.currentLetter = 0;
      }
    }
  }

  checkWord(solutionWord: string, word: string) {
    console.log(word);
  }

  deletePrevious() {
    if (this.currentLetter == 5 || this.currentLetter == 0) {
      return;
    }
    this.gameBoard[this.currentWord][this.currentLetter - 1] = '';
    this.currentLetter--;
  }

  finishGame() {
    this.gameFinished = true;
    console.log('Game is finished!');
  }
}
