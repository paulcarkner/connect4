import * as React from "react";
import Style from "./Board.module.css";
import Column from "./Column";

export default class Board extends React.Component<{
  boardLayout: Array<Array<number>>; //current token locations
  clickHandler: React.MouseEventHandler; //column click handler
  playerColor: string; //current player colour (css string)
}> {
  render() {
    return (
      <div className={Style.boardContainer}>
        <div
          className={Style.board}
          style={
            { "--player-color": this.props.playerColor } as React.CSSProperties
            //sets css variable for current player colour for .column:hover::after css
          }
        >
          {this.props.boardLayout.map((x, index) => (
            <Column
              key={index}
              columnIndex={index}
              columnLayout={this.props.boardLayout[index]} //tokens in column
              clickHandler={this.props.clickHandler} //column click handler
            />
          ))}
        </div>
      </div>
    );
  }
}
