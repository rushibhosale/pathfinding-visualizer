import { getAllNeighbours } from "../UtilityFunctions";

export function BreadthFirstSearch(grid, startNode, endNode) {
    const queue = [];
    const visitedNodes = [];
    queue.push(startNode);

    while (!!queue.length) {
        const closetNode = queue.shift();
        closetNode.isVisited = true;
        visitedNodes.push(closetNode);

        if (closetNode === endNode)
            return visitedNodes;

        const neighbors = getAllNeighbours(closetNode, grid);
        // neighbors.reverse();
        for (let neighbor of neighbors) {
            if (!neighbor.isVisited) {
                queue.push(neighbor);
                neighbor.isVisited = true;
                neighbor.previousNode = closetNode;
            }
        }
    }
    return visitedNodes;
}