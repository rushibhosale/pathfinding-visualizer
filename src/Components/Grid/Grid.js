import { Component } from "react";
import { MazeAnimation } from "../../Algorithms/Animation/MazeAnimation";
import { PathAnimation } from "../../Algorithms/Animation/PathAnimation";
import { Astar } from "../../Algorithms/GraphAlgorithms/Astar";
import { BreadthFirstSearch } from "../../Algorithms/GraphAlgorithms/BreadthFirstSearch";
import { DefthFirstSearch } from "../../Algorithms/GraphAlgorithms/DefthFirstSearch";
import { Dijstras, getShortesPath } from "../../Algorithms/GraphAlgorithms/Dijstras";
import { GreedyBFS } from "../../Algorithms/GraphAlgorithms/GreedyBFS";
import { RecursiveDivision } from "../../Algorithms/MazeAlgorithms/RecursiveDivision";
import { RecursiveDivisionHorizontal } from "../../Algorithms/MazeAlgorithms/RecursiveDivisionHorizontal";
import { RecursiveDivisionVertical } from "../../Algorithms/MazeAlgorithms/RecursiveDivisionVertical";
import { clearPaths } from "../../Algorithms/UtilityFunctions";
import { Navbar } from "../Navbar/Navbar";
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
        this.maxHeight = 21;
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
            <>
                <Navbar
                    data={{
                        handler: this.algorithmHandler.bind(this)
                    }}
                ></Navbar>
                {/* //<button onClick={this.visualize.bind(this)}>
            //     Visualize!!
            // </button> | <button onClick={this.visualizeMaze.bind(this)}>
            //         generateMaze!!
            //     </button> */}
                <div className="grid">
                    {
                        grid.map((row, rowIdx) => {
                            return (
                                <div key={rowIdx} className="row">
                                    {row.map((node, nodeIdx) => {
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
                                            isWall={isWall} />
                                        );

                                    })}
                                </div>
                            );
                        })}
                </div></>

        );
    }

    //mouse clicked
    handleMouseDownEvent(row, col) {

        let grid;
        if (row === START_NODE_ROW && col === START_NODE_COL) {
            grid = toggleStart(this.state.grid, row, col);
            this.setState({ isDraggingStart: true });
        }
        else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
            grid = toggleFinsih(this.state.grid, row, col);
            this.setState({ isDraggingFinsh: true });
        }
        else {
            grid = toggleWall(this.state.grid, row, col);
        }
        this.setState({ grid, isMouseClicked: true });

    }
    handleMouseEnterEvent(row, col) {
        if (!this.state.isMouseClicked) return;
        let grid;
        if (this.state.isDraggingStart) {
            if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) return;
            grid = toggleStart(this.state.grid, row, col);
        }
        else if (this.state.isDraggingFinsh) {
            if (row === START_NODE_ROW && col === START_NODE_COL) return;
            grid = toggleFinsih(this.state.grid, row, col);
        }
        else
            grid = toggleWall(this.state.grid, row, col);

        this.setState({ grid });
    }
    //mouse realeased
    handleMouseUpEvent(row, col) {
        this.setState({ isMouseClicked: false, isDraggingStart: false, isDraggingFinsh: false })
    }


    //
    visualize() {
        // console.log("visulizing", this.state);
        const { grid } = this.state;
        clearPaths(grid, false);
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const endNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedArray = Astar(grid, startNode, endNode);
        const shortestPath = getShortesPath(endNode);
        PathAnimation(visitedArray, shortestPath);
    }
    visualizeMaze() {
        const { grid } = this.state;
        clearPaths(grid, true);
        const visitedArray = RecursiveDivisionHorizontal(
            grid,
            1,
            grid.length - 2,
            1,
            grid[0].length - 2,
            "horizontal",
        );
        MazeAnimation(visitedArray);
        // this.setState({ grid });
    }
    algorithmHandler() {
        console.log("hello from handler");
    }
}
//create Node
const createNewNode = (row, col) => {
    return {
        row,
        col,
        isStartNode: row === START_NODE_ROW && col === START_NODE_COL,
        isFinishNode: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        isWall: false,
        distance: Infinity,
        isVisited: false,
        //for a* 
        heurastic: Infinity,
        fscore: Infinity,
        previousNode: null
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
