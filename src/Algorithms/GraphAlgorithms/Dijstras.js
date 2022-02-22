import { getAllNeighbours } from "../UtilityFunctions";

export function Dijstras(grid, startNode, endNode) {
    const unvisitedNodes = getAllNodes(grid);
    const visitedNodes = [];
    startNode.isWall = endNode.isWall = false;
    startNode.distance = 0;
    while (!!unvisitedNodes.length) {
        const closetNode = getClosetNode(unvisitedNodes);
        if (closetNode.isWall) continue;
        closetNode.isVisited = true;
        if (closetNode.distance === Infinity) return visitedNodes;
        visitedNodes.push(closetNode);
        if (closetNode === endNode) {
            return visitedNodes;
        }
        updateUnvisitedNeighbors(closetNode, grid);
    }
    return visitedNodes;
}

const updateUnvisitedNeighbors = (node, grid) => {
    const neighbors = getAllNeighbours(node, grid);
    for (let neighbor of neighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
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
export const getShortesPath = (node) => {
    const shortesPath = [];
    while (node.previousNode) {
        shortesPath.unshift(node);
        node = node.previousNode;
    }
    shortesPath.unshift(node);
    return shortesPath;
}