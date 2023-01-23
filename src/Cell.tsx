import * as React from "react";
import Style from "./Cell.module.css";

export default class Cell extends React.Component<{
  columnIndex: number;
  cellIndex: number;
  cellValue: number; //token colour or null
}> {
  render(): JSX.Element {
    return (
      <div
        className={`${Style.cell} ${
          this.props.cellValue === 1 ? Style.red : null
        } ${this.props.cellValue === 2 ? Style.black : null}`} //add token colour class
        style={
          {
            "--xShift": (3 - this.props.columnIndex) * 1 + "%",
            "--yShift": (2.5 - this.props.cellIndex) * 1 + "%",
          } as React.CSSProperties //set perspective shift css variables based on cell location
        }
      ></div>
    );
  }
}
