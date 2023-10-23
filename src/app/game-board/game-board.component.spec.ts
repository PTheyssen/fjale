import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoardComponent } from './game-board.component';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameBoardComponent]
    });
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Parse solution word correctly', () => {
    expect(component.parseSolutionWord("xhejms")).toEqual(["xh", "e", "j", "m", "s"]);
  })
});
