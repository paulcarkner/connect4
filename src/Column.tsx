import * as React from "react";
import Style from "./Column.module.css";
import Cell from "./Cell";

export default class Column extends React.Component<{ columnIndex: number, columnLayout: Array<number>, clickHandler : React.MouseEventHandler }> {
    render() {
        return (
            <button className={Style.column} onClick={this.props.clickHandler} data-column-id={this.props.columnIndex}>
                {
                    this.props.columnLayout.map((x, index) => <Cell key={index} columnIndex={this.props.columnIndex} cellIndex={index} cellValue={x} />)
                }
            </button>
        );
    }
}