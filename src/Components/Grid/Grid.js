import { Component } from "react";
import "./Grid.css";
import { Node } from "./Node/Node";

//startNode row,col
let START_NODE_ROW = 10;
let START_NODE_COL = 20;
//Finish NOde row,col
let FINISH_NODE_ROW = 1;
let FINISH_NODE_COL = 30;

export class Grid extends Component {

    constructor() {
        super();
        this.state = {
            grid: [],
            isMouseClicked: false,
            isDraggingStart: false,
            isDraggingFinsh: false
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
        if (row == START_NODE_ROW && col == START_NODE_COL) {
            const grid = toggleStart(this.state.grid, row, col);
            this.setState({ grid, isDraggingStart: true });
        }
        else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
            const grid = toggleFinsih(this.state.grid, row, col);
            this.setState({ grid, isDraggingFinsh: true });
        }
        else {
            console.log("mouse is realease", row, col);
            const grid = toggleWall(this.state.grid, row, col);
            this.setState({ grid });

        }
        // || (row == FINISH_NODE_ROW && col == FINISH_NODE_COL)) return;
    }
    handleMouseEnterEvent(row, col) {
        if (!this.state.isMouseClicked) return;
        if (this.state.isDraggingStart) {
            const grid = toggleStart(this.state.grid, row, col);
            this.setState({ grid });
            console.log("start nide");
        }
        else if (this.state.isDraggingFinsh) {
            const grid = toggleFinsih(this.state.grid, row, col);
            this.setState({ grid });
        }
        else {
            console.log("mouse is realease", row, col);
            const grid = toggleWall(this.state.grid, row, col);
            this.setState({ grid });

        }
    }
    //mouse realeased
    handleMouseUpEvent(row, col) {
        this.setState({ isMouseClicked: false, isDraggingStart: false })
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
//toggle StartNode
const toggleStart = (grid, row, col) => {
    const tempGrid = grid.slice();
    const node = tempGrid[row][col];
    grid[START_NODE_ROW][START_NODE_COL].isStartNode = false;
    const newNode = {
        ...node,
        isStartNode: !node.isStartNode
    }
    tempGrid[row][col] = newNode;
    START_NODE_ROW = row;
    START_NODE_COL = col;
    return tempGrid;
}

//toggle finish
const toggleFinsih = (grid, row, col) => {
    const tempGrid = grid.slice();
    const node = tempGrid[row][col];
    grid[FINISH_NODE_ROW][FINISH_NODE_COL].isFinishNode = false;
    const newNode = {
        ...node,
        isFinishNode: !node.isFinishNode
    }
    tempGrid[row][col] = newNode;
    FINISH_NODE_ROW = row;
    FINISH_NODE_COL = col;
    return tempGrid;
}

