import * as React from "react";
import Style from "./Board.module.css";
import Column from "./Column";

export default class Board extends React.Component<{
  boardLayout: Array<Array<number>>;
  clickHandler: React.MouseEventHandler;
  playerColor: string;
}> {
  render() {
    return (
      <div className={Style.boardContainer}>
        <div className={Style.board} style={{'--player-color': this.props.playerColor} as React.CSSProperties}>
          {this.props.boardLayout.map((x, index) => (
            <Column
              key={index}
              columnIndex={index}
              columnLayout={this.props.boardLayout[index]}
              clickHandler={this.props.clickHandler}
            />
          ))}
        </div>
      </div>
    );
  }
}
