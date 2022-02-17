import { Component } from "react";

export class Node extends Component {
    constructor() {
        super();
    }
    render() {
        const { row, col, isStartNode, isFinishNode } = this.props;

        return (

            <div id={`node-${row}-${col}`} className="node"></div>
        );
    }
}