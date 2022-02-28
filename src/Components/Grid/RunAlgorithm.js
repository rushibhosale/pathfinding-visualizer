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

export function RunAlgorithms(grid, startNode, endNode, value, type, speed, setVisualizingState) {

    if (type === "graph") {
        clearPaths(grid, false);
        const visitedArray = visualizeGraphAlgorithm(grid, startNode, endNode, value);
        const minPathArray = getShortesPath(endNode);
        PathAnimation(visitedArray, minPathArray, speed, setVisualizingState);
    }
    else if (type === "maze") {
        clearPaths(grid, true);
        const walls = visualizeMazeAlgorithm(grid, value);
        MazeAnimation(walls, speed, setVisualizingState);
    }
    else if (type === "clearPaths") {
        clearPaths(grid, true);
    }
    return true;
}


function visualizeGraphAlgorithm(grid, startNode, endNode, value) {
    let visitedArray;
    if (value === "Dijstra's") {
        visitedArray = Dijstras(grid, startNode, endNode);
    }
    else if (value === "DFS") {
        visitedArray = DefthFirstSearch(grid, startNode, endNode);
    }

    else if (value === "BFS") {
        visitedArray = BreadthFirstSearch(grid, startNode, endNode);
    }

    else if (value === "Greedy BFS") {
        visitedArray = GreedyBFS(grid, startNode, endNode);
    }
    else if (value === "A*") {
        visitedArray = Astar(grid, startNode, endNode);
    }
    return visitedArray;
}
function visualizeMazeAlgorithm(grid, value) {
    let walls;
    console.log(value)
    //Recursicve Division Maze
    if (value === "RDM")
        walls = RecursiveDivision(
            grid,
            1,
            grid.length - 2,
            1,
            grid[0].length - 2,
            "horizontal",
        );
    else if (value === "RDMH")
        walls = RecursiveDivisionHorizontal(
            grid,
            1,
            grid.length - 2,
            1,
            grid[0].length - 2,
            "horizontal",
        );

    else if (value === "RDMV")
        walls = RecursiveDivisionVertical(
            grid,
            1,
            grid.length - 2,
            1,
            grid[0].length - 2,
            "vertical",
        );

    return walls;
}