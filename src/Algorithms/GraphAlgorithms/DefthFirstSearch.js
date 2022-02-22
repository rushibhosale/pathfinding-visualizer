import { getAllNeighbours } from "../UtilityFunctions";

const visitedNodes = [];
export function DefthFirstSearch(grid, startNode, endNode) {
    dfs(grid, startNode, endNode, visitedNodes);
    return visitedNodes;
}
//recursive dfs 
function dfs(grid, node, goal, visitedNodes) {
    if (node === goal) {
        return true;
    }
    node.isVisited = true;
    visitedNodes.push(node);
    const neighbours = getAllNeighbours(node, grid);

    for (let i = neighbours.length - 1; ~i; i--) {
        const neighbour = neighbours[i];
        if (!neighbour.isVisited) {
            neighbour.previousNode = node;
            neighbour.isVisited = true;
            if (dfs(grid, neighbour, goal, visitedNodes))
                return true;
        }
    }
    return false;
}