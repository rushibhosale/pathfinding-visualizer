export function Dijstras(grid, startNode, endNode) {
    const unvisitedNodes = getAllNodes(grid);
    const visitedNodes = [];
    console.log(startNode)
    startNode.isWall = endNode.isWall = false;
    startNode.distance = 0;
    while (!!unvisitedNodes.length) {
        const closetNode = getClosetNode(unvisitedNodes);
        if (closetNode.isWall) continue;
        closetNode.isVisited = true;
        if (closetNode.distance === Infinity) return visitedNodes;
        visitedNodes.push(closetNode);
        if (closetNode === endNode) {
            console.log("finsi")
            return visitedNodes;
        }
        updateUnvisitedNeighbors(closetNode, grid);
    }

}

const updateUnvisitedNeighbors = (node, grid) => {
    const neighbors = getAllNeigbours(node, grid);
    for (let neighbor of neighbors) {
        neighbor.distance = node.distance + 1;
    }

}

const getAllNeigbours = (node, grid) => {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}
const getAllNodes = (grid) => {
    const unvisitedNodes = [];
    grid.forEach(row => {
        row.forEach(node => {
            unvisitedNodes.push(node);
        })
    });

    return unvisitedNodes;
}
const getClosetNode = (unvisitedNodes) => {
    let winner = 0;
    for (let i = 0; i < unvisitedNodes.length; i++) {
        if (unvisitedNodes[winner].distance > unvisitedNodes[i].distance)
            winner = i;
    }
    const closetNode = unvisitedNodes[winner];
    unvisitedNodes.splice(winner, 1);
    return closetNode;
}