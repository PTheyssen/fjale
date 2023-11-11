import { Component } from '@angular/core';

enum LetterOutcome {
  bottom,
  wrong,
  wrongPosition,
  correct,
}

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent {
  gameIsSolved: boolean = false;
  gameFinished: boolean = false;
  solutionWord: string = '';
  wordList: Array<string> = [];
  currentLetter: number = 0;
  currentWord: number = 0;
  gameBoard: Array<Array<string>> = [];
  outcomeBoard: Array<Array<LetterOutcome>> = [];

  async ngOnInit() {
    this.reset();
    await fetch('assets/fjale.txt')
      .then((response) => response.text())
      .then((text) => (this.wordList = text.split('\n')));
    this.solutionWord =
      this.wordList[Math.floor(Math.random() * this.wordList.length)];
  }

  async reset() {
    this.gameIsSolved = false;
    this.gameFinished = false;
    await fetch('assets/fjale.txt')
      .then((response) => response.text())
      .then((text) => (this.wordList = text.split('\n')));
    this.solutionWord =
      this.wordList[Math.floor(Math.random() * this.wordList.length)];    
    this.wordList = [];
    this.currentLetter = 0;
    this.currentWord = 0;
    this.gameBoard = [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ];
    this.outcomeBoard = [
      [
        LetterOutcome.bottom,
        LetterOutcome.bottom,
        LetterOutcome.bottom,
        LetterOutcome.bottom,
        LetterOutcome.bottom,
      ],
      [
        LetterOutcome.bottom,
        LetterOutcome.bottom,
        LetterOutcome.bottom,
        LetterOutcome.bottom,
        LetterOutcome.bottom,
      ],
      [
        LetterOutcome.bottom,
        LetterOutcome.bottom,
        LetterOutcome.bottom,
        LetterOutcome.bottom,
        LetterOutcome.bottom,
      ],
      [
        LetterOutcome.bottom,
        LetterOutcome.bottom,
        LetterOutcome.bottom,
        LetterOutcome.bottom,
        LetterOutcome.bottom,
      ],
      [
        LetterOutcome.bottom,
        LetterOutcome.bottom,
        LetterOutcome.bottom,
        LetterOutcome.bottom,
        LetterOutcome.bottom,
      ],
    ];
  }


  onKeyClick(key: string) {
    if (!this.gameFinished) {
      this.gameBoard[this.currentWord][this.currentLetter] = key;
      this.currentLetter++;
      if (this.currentLetter >= 5) {
        console.log();
        let submittedWord: string[] = this.gameBoard[this.currentWord];
        let lowerCaseSubmittedWord = submittedWord.map((x) => x.toLowerCase());
        let wordOutcome = this.checkWord(
          this.solutionWord,
          lowerCaseSubmittedWord
        );
        this.outcomeBoard[this.currentWord] = wordOutcome;
        if (this.isOutcomeCorrect(wordOutcome)) {
          this.gameIsSolved = true;
            this.gameFinished = true;
            this.finishGame();            
          return;
        }
        if (this.currentWord >= 4) {
          this.gameFinished = true;
            this.finishGame();  
          return;
        }
        this.currentWord++;
        this.currentLetter = 0;
      }
    } 
  }

  checkWord(solutionWord: string, word: Array<string>) {
    let parsedSolWord: string[] = this.parseSolutionWord(solutionWord);
    let outcome: LetterOutcome[] = [];
    for (let i = 0; i < 5; i++) {
      if (word[i] == parsedSolWord[i]) {
        outcome.push(LetterOutcome.correct);
      } else if (parsedSolWord.includes(word[i])) {
        outcome.push(LetterOutcome.wrongPosition);
      } else {
        outcome.push(LetterOutcome.wrong);
      }
    }
    return outcome;
  }

  isOutcomeCorrect(outcome: LetterOutcome[]): boolean {
    let isCorrect = true;
    outcome.forEach((element) => {
      if (element != LetterOutcome.correct) {
        isCorrect = false;
      }
    });
    return isCorrect;
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
      setTimeout(() => {
          if (this.gameIsSolved) {
              alert("You won! :)")
          }
          alert(
              `You lost! \nThe correct word: ${this.solutionWord}`);
      }, 100);
  }

  parseSolutionWord(word: string): Array<string> {
    let result: string[] = [];
    const doubleLetters: string[] = [
      'dh',
      'gj',
      'll',
      'rr',
      'sh',
      'th',
      'zh',
      'xh',
    ];
    const chars: string[] = word.split('');
    for (let i = 0; i < chars.length; i++) {
      let item = chars[i];
      if (i < chars.length - 1) {
        if (doubleLetters.includes(chars[i] + chars[i + 1])) {
          result.push(chars[i] + chars[i + 1]);
          i++;
          continue;
        }
      }
      result.push(chars[i]);
    }
    // TODO
    return result;
  }

  getOutcomeColor(letterOutcome: LetterOutcome): string {
    switch (letterOutcome) {
      case LetterOutcome.bottom:
        return 'white';
      case LetterOutcome.correct:
        return 'green';
      case LetterOutcome.wrongPosition:
        return 'yellow';
      case LetterOutcome.wrong:
        return 'grey';
    }
  }
}
