import { Component } from "react";
import "./Node.css";
export class Node extends Component {
    constructor() {
        super();
    }
    render() {
        const { row, col, isStartNode, isFinishNode, onMouseDown, onMouseUp, isWall } = this.props;
        const class_name = isStartNode ? "start-node"
            : isFinishNode ? "finish-node"
                : isWall ? "wall" : "";
        return (

            <div id={`node-${row}-${col}`}
                className={`node ${class_name}`}
                onMouseDown={(e) => onMouseDown(row, col)}
                onMouseUp={(e) => onMouseUp(row, col)}
            ></div>
        );
    }
}