import * as React from "react";
import Style from "./App.module.css";
import Board from "./Board";

class App extends React.Component<{}> {
  constructor(props: any) {
    super(props);
  }

  state = {
    board: new Array(7).fill(null).map(() => new Array(6).fill(null)),
    isPlayer1: true
  };

  componentDidMount() {
  }

  handleClick = (e: React.MouseEvent): void => {
    const columnIndex: number = parseInt(e.currentTarget.getAttribute("data-column-id"));
    const newBoard = this.state.board;
    for (let x = 5; x >= 0; x--) {
      if (newBoard[columnIndex][x] === null) {
        newBoard[columnIndex][x] = this.state.isPlayer1 ? 1 : 2;
        this.setState({board: newBoard, isPlayer1: !this.state.isPlayer1}, this.checkWinner);
        break;
      }
    }
  }

  checkWinner = () => {
  }

  render() {
    return (
      <div className="App">
        <Board boardLayout={this.state.board} clickHandler={this.handleClick} />
      </div>
    );
  }
}

export default App;
