const getAllNeigbours = (node, grid) => {
    const neighbours = [];
    let { row, col } = node;
    if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
    if (col !== 0) neighbours.push(grid[row][col - 1]);
    if (row !== 0) neighbours.push(grid[row - 1][col]);


    return neighbours.filter(
        (neighbour) => !neighbour.isWall && !neighbour.isVisited
    );
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export { getAllNeigbours, sleep };