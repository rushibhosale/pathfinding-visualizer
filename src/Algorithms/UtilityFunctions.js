

const clearPaths = (grid, clearWalls, clearPath = true) => {
    grid.forEach(row => {
        row.forEach(node => {
            node.distance = Infinity;
            node.isVisited = false;
            node.previousNode = null;
            if (clearPath) {
                if (!node.isWall && !node.isStartNode && !node.isFinishNode)
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        "node ";
                else if (node.isStartNode)
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        "node start-node";
                else if (node.isFinishNode)
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        "node finish-node";
            }

            if (clearWalls) node.isWall = false;
        });
    });
}

const getAllNeighbours = (node, grid) => {
    const neighbours = [];
    let { row, col } = node;
    if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
    if (col !== 0) neighbours.push(grid[row][col - 1]);
    if (row !== 0) neighbours.push(grid[row - 1][col]);

    // if (row !== 0 && col !== 0) neighbours.push(grid[row - 1][col - 1]);
    // if (row !== 0 && col !== grid[0].length - 1) neighbours.push(grid[row - 1][col + 1]);

    // if (row !== grid.length - 1 && col !== grid[0].length - 1) neighbours.push(grid[row + 1][col + 1]);
    // if (row !== grid.length - 1 && col !== 0) neighbours.push(grid[row + 1][col - 1]);

    return neighbours.filter(
        (neighbour) => !neighbour.isWall && !neighbour.isVisited
    );
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// //heurasticDistance
const heurasticDistance = (start, goal) => {
    return Math.abs(start.row - goal.row) + Math.abs(start.col - goal.col);
}

//Euclidean Distance
// const heurasticDistance = (start, goal) => {
//     const x = Math.abs(start.row - goal.row);
//     const y = Math.abs(start.col - goal.col);
//     return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
// }

export { getAllNeighbours, sleep, heurasticDistance, clearPaths };