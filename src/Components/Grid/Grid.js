import { Component } from "react";
import "./Grid.css";
import { Node } from "./Node/Node";

//startNode row,col
const START_NODE_ROW = 10;
const START_NODE_COL = 20;
//Finish NOde row,col
const FINISH_NODE_ROW = 1;
const FINISH_NODE_COL = 30;

export class Grid extends Component {

    constructor() {
        super();
        this.state = {
            grid: []
        }

        //set variable for  max rows and cols
        this.maxWidth = 50;
        this.maxHeight = 20;



    }

    componentDidMount() {
        const grid = this.createInitialGrid();
        this.setState({ grid });
    }

    createInitialGrid() {
        const grid = [];
        for (let i = 0; i < this.maxHeight; i++) {
            const row = [];
            for (let j = 0; j < this.maxWidth; j++) {
                row.push(createNewNode(i, j));
            }
            grid.push(row);
        }
        return grid;
    }

    render() {
        // console.log(this.state.grid)
        const { grid } = this.state;

        return (
            <div className="grid">
                {
                    grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx} className="row" >
                                {
                                    row.map((node, nodeIdx) => {
                                        const { row, col, isStartNode, isFinishNode } = node;
                                        return (<Node
                                            key={nodeIdx}
                                            row={row}
                                            col={col}
                                            isStartNode={isStartNode}
                                            isFinishNode={isFinishNode}
                                        />
                                        );

                                    })
                                }
                            </div>
                        );
                    })
                }
            </div >

        );
    }

}

const createNewNode = (row, col) => {

    return {
        row,
        col,
        isStartNode: row == START_NODE_ROW && col == START_NODE_COL,
        isFinishNode: row == FINISH_NODE_ROW && col == FINISH_NODE_COL,
    }

}