import * as React from "react";
import Style from "./Board.module.css";
import Column from "./Column";

export default class Board extends React.Component<{boardLayout: Array<Array<number>>, clickHandler: React.MouseEventHandler}> {
    render() {
        return (
            <div className={Style.board}>
                {
                    this.props.boardLayout.map((x, index) => <Column key={index} columnIndex={index} columnLayout={this.props.boardLayout[index]} clickHandler={this.props.clickHandler} />)
                }
            </div>
        );
    }
}

