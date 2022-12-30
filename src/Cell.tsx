import * as React from "react";
import Style from "./Cell.module.css";
 
export default class Cell extends React.Component <{columnIndex: number, cellIndex: number, cellValue: number}> {
    render() {
        return (
<div className={`${Style.cell} ${this.props.cellValue === 1 ? Style.red : null} ${this.props.cellValue === 2 ? Style.black : null}`}>
    {this.props.columnIndex} : {this.props.cellIndex} : {this.props.cellValue}
</div>
        );
    }
}