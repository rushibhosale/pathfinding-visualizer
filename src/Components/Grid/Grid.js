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
            grid: [],
            isMouseClicked: false
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
                                        const { row, col, isStartNode, isFinishNode, isWall } = node;
                                        return (<Node
                                            key={nodeIdx}
                                            row={row}
                                            col={col}
                                            isStartNode={isStartNode}
                                            isFinishNode={isFinishNode}
                                            onMouseDown={(row, col) => this.handleMouseDownEvent(row, col)}
                                            onMouseUp={(row, col) => this.handleMouseUpEvent(row, col)}
                                            onMouseEnter={(row, col) => this.handleMouseEnterEvent(row, col)}
                                            isWall={isWall}
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

    //mouse clicked
    handleMouseDownEvent(row, col) {
        this.setState({ isMouseClicked: true });
        if ((row == START_NODE_ROW && col == START_NODE_COL) || (row == FINISH_NODE_ROW && col == FINISH_NODE_COL)) return;
        console.log("mouse is realease", row, col);
        const grid = toggleWall(this.state.grid, row, col);
        this.setState({ grid });
    }
    handleMouseEnterEvent(row, col) {
        if (!this.state.isMouseClicked) return;
        if ((row == START_NODE_ROW && col == START_NODE_COL) || (row == FINISH_NODE_ROW && col == FINISH_NODE_COL)) return;
        console.log("mouse is realease", row, col);
        const grid = toggleWall(this.state.grid, row, col);
        this.setState({ grid });
    }
    //mouse realeased
    handleMouseUpEvent(row, col) {
        this.setState({ isMouseClicked: false })
    }


}
//create Node
const createNewNode = (row, col) => {
    return {
        row,
        col,
        isStartNode: row == START_NODE_ROW && col == START_NODE_COL,
        isFinishNode: row == FINISH_NODE_ROW && col == FINISH_NODE_COL,
        isWall: false
    }

}
//togglewall
const toggleWall = (grid, row, col) => {
    const tempGrid = grid.slice();
    const node = tempGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall
    }
    tempGrid[row][col] = newNode;
    return tempGrid;
}