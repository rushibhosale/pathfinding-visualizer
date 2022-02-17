import { Component } from "react";
import "./Node.css";
export class Node extends Component {
    constructor() {
        super();
    }
    render() {
        const { row, col, isStartNode, isFinishNode } = this.props;
        const class_name = isStartNode ? "node start-node" : isFinishNode ? "node finish-node" : "node";
        return (

            <div id={`node-${row}-${col}`} className={class_name}></div>
        );
    }
}