import * as React from "react";
import Style from "./App.module.css";
import Board from "./Board";

interface AppState {
  board: Array<Array<number>>;
  isPlayer1: boolean;
  winner: null | 1 | 2;
}

class App extends React.Component<{}> {
  state: AppState = {
    board: new Array(7).fill(null).map(() => new Array(6).fill(null)), //create 7x6 grid for board
    isPlayer1: true,
    winner: null,
  };

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    if (this.state.winner !== null) {
      //show modal on winner
      document.getElementsByTagName("dialog")[0].showModal(); //modal must be shown by function for proper functionality
    }
  }

  //handles when a column is clicked to "drop" the token
  handleClick = (e: React.MouseEvent): void => {
    const columnIndex: number = parseInt(
      e.currentTarget.getAttribute("data-column-id")
    ); //gets column index of clicked column
    const newBoard = this.state.board; //makes copy of current state
    for (let x = 5; x >= 0; x--) {
      //iterates from bottom to top of column
      if (newBoard[columnIndex][x] === null) {
        //finds first empty cell
        newBoard[columnIndex][x] = this.state.isPlayer1 ? 1 : 2; //adds player's token to cell
        this.setState(
          { board: newBoard, isPlayer1: !this.state.isPlayer1 }, //save updated board
          () => this.checkWinner() //call winner check function
        );
        break; //stops checking rest of column
      }
    }
  };

  checkWinner = (): void => {
    let lastToken: number = null; //traking which colour the current string of tokens is
    let tokenCount: number = 0; //traking length of current string of tokens

    //vertical check
    for (let x = 0; x < 7; x++) {
      for (let y = 0; y < 6; y++) {
        if (this.state.board[x][y] !== lastToken) tokenCount = 0; //if colour changed, reset count
        tokenCount++; //increment count
        lastToken = this.state.board[x][y]; //update token colour tracker
        if (tokenCount === 4 && lastToken !== null) {
          //if current run is 4...
          this.setState({ winner: lastToken }); //set winner in state
          return; //exit function
        }
      }
      lastToken = null; //reset token colour for next column
    }

    //horizontal check
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 7; x++) {
        if (this.state.board[x][y] !== lastToken) tokenCount = 0; //if colour changed, reset count
        tokenCount++; //increment count
        lastToken = this.state.board[x][y]; //update token colour tracker
        if (tokenCount === 4 && lastToken !== null) {
          //if current run is 4...
          this.setState({ winner: lastToken }); //set winner in state
          return; //exit function
        }
      }
      lastToken = null; //reset token colour for next row
    }

    //positive angle check
    for (let x = 3; x < 7; x++) {
      //starting cell must be at least 3 away from left and bottom
      for (let y = 0; y < 3; y++) {
        if (
          this.state.board[x][y] === this.state.board[x - 1][y + 1] &&
          this.state.board[x][y] === this.state.board[x - 2][y + 2] &&
          this.state.board[x][y] === this.state.board[x - 3][y + 3] &&
          this.state.board[x][y] !== null
        ) {
          //if starting cell and three on a downward-left angle are the same colour...
          this.setState({ winner: this.state.board[x][y] }); //set winner to current starting cell colour
          return; //exit function
        }
      }
    }

    //negative angle check
    for (let x = 0; x < 4; x++) {
      //starting cell must be at least 3 away from right and bottom
      for (let y = 0; y < 3; y++) {
        if (
          this.state.board[x][y] === this.state.board[x + 1][y + 1] &&
          this.state.board[x][y] === this.state.board[x + 2][y + 2] &&
          this.state.board[x][y] === this.state.board[x + 3][y + 3] &&
          this.state.board[x][y] !== null
        ) {
          //if starting cell and three on a downward-right angle are the same colour...
          this.setState({ winner: this.state.board[x][y] }); //set winner to current starting cell colour
          return; //exit function
        }
      }
    }
  };

  //reloads page on winner modal to restart game
  reload = (): void => {
    window.location.reload();
  };

  render(): JSX.Element {
    return (
      <div className={Style.app}>
        <Board
          boardLayout={this.state.board} //current token locations
          clickHandler={this.handleClick} //column click handler
          playerColor={this.state.isPlayer1 ? "red" : "#444"} //current player colour (css string)
        />
        <dialog className={Style.dialog}>
          Player {this.state.winner} is the winner!
          <br />
          <button onClick={this.reload}>Play Again</button>
        </dialog>
      </div>
    );
  }
}

export default App;
