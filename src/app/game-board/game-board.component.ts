import { Component } from '@angular/core';


@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
  lastClickedKeys: string[] = ['', '', '', '', ''];
  displayedKeys: string[] = [];

  onKeyClick(key: string) {
    console.log(key);
    if (this.lastClickedKeys.length >= 5) {
      this.lastClickedKeys.shift(); // Remove the oldest key if there are 5 keys already
    }
    this.lastClickedKeys.push(key);
    this.displayedKeys = this.lastClickedKeys;
  }
}
