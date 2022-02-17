import { Component } from "react";
import "./Grid.css";
export class Grid extends Component {

    constructor() {
        super();
        this.state = {
            grid: []
        }
    }

    componentDidMount() {
        const grid = this.createInitialGrid();
        this.setState({ grid });
    }

    createInitialGrid() {
        const grid = [];
        for (let i = 0; i < 20; i++) {
            const row = [];
            for (let j = 0; j < 40; j++) {
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
                                        return (<div key={nodeIdx} id={`node-${rowIdx}-${nodeIdx}`} className="node"></div>
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
        isStartNode: false,
        isFinishNode: false,
    }

}