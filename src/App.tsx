import * as React from "react";
import Style from "./App.module.css";
import Board from "./Board";

class App extends React.Component<{}> {
  constructor(props: any) {
    super(props);
  }

  state = {
    board: new Array(7).fill(null).map(() => new Array(6).fill(null)),
    isPlayer1: true,
    winner: "",
  };

  componentDidMount() {}

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    if (this.state.winner !== "") {
      document.getElementsByTagName("dialog")[0].showModal();
    }
  }

  handleClick = (e: React.MouseEvent): void => {
    const columnIndex: number = parseInt(
      e.currentTarget.getAttribute("data-column-id")
    );
    const newBoard = this.state.board;
    for (let x = 5; x >= 0; x--) {
      if (newBoard[columnIndex][x] === null) {
        newBoard[columnIndex][x] = this.state.isPlayer1 ? 1 : 2;
        this.setState(
          { board: newBoard, isPlayer1: !this.state.isPlayer1 },
          () => this.checkWinner()
        );
        break;
      }
    }
  };

  checkWinner = () => {
    let lastToken: string = null;
    let tokenCount: number = 0;

    //vertical check
    for (let x = 0; x < 7; x++) {
      for (let y = 0; y < 6; y++) {
        if (this.state.board[x][y] !== lastToken) tokenCount = 0;
        tokenCount++;
        lastToken = this.state.board[x][y];
        if (tokenCount === 4 && lastToken !== null) {
          this.setState({ winner: lastToken });
          return;
        }
      }
      lastToken = null;
    }

    //horizontal check
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 7; x++) {
        if (this.state.board[x][y] !== lastToken) tokenCount = 0;
        tokenCount++;
        lastToken = this.state.board[x][y];
        if (tokenCount === 4 && lastToken !== null) {
          this.setState({ winner: lastToken });
          return;
        }
      }
      lastToken = null;
    }

    //positive angle check
    for (let x = 3; x < 7; x++) {
      for (let y = 0; y < 3; y++) {
        if (
          this.state.board[x][y] === this.state.board[x - 1][y + 1] &&
          this.state.board[x][y] === this.state.board[x - 2][y + 2] &&
          this.state.board[x][y] === this.state.board[x - 3][y + 3] &&
          this.state.board[x][y] !== null
        ) {
          this.setState({ winner: this.state.board[x][y] });
          return;
        }
      }
    }

    //negative angle check
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 3; y++) {
        if (
          this.state.board[x][y] === this.state.board[x + 1][y + 1] &&
          this.state.board[x][y] === this.state.board[x + 2][y + 2] &&
          this.state.board[x][y] === this.state.board[x + 3][y + 3] &&
          this.state.board[x][y] !== null
        ) {
          this.setState({ winner: this.state.board[x][y] });
          return;
        }
      }
    }
  };

  reload = () => {
    window.location.reload();
  };

  render() {
    return (
      <div className={Style.App}>
        <Board
          boardLayout={this.state.board}
          clickHandler={this.handleClick}
          playerColor={this.state.isPlayer1 ? "red" : "#444"}
        />
        <dialog className={Style.Dialog}>
          Player {this.state.winner} is the winner!
          <br />
          <button onClick={this.reload}>Play Again</button>
        </dialog>
      </div>
    );
  }
}

export default App;
