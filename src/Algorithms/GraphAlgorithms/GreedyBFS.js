//Best First Search

import { getAllNeighbours, heurasticDistance } from "../UtilityFunctions";

//f(n)= h(n).
export function GreedyBFS(grid, startNode, endNode) {
    const openset = [];
    const closeset = [];
    openset.push(startNode);
    while (!!openset.length) {
        const closetNode = getClosetNode(openset);
        closetNode.isVisited = true;
        closeset.push(closetNode);
        if (closetNode === endNode)
            return closeset;

        const neighbors = getAllNeighbours(closetNode, grid);
        for (const neighbor of neighbors) {
            const tempHeurastic = heurasticDistance(neighbor, endNode);
            if (openset.includes(neighbor)) {
                if (tempHeurastic < neighbor.heuristic) {
                    neighbor.heuristic = tempHeurastic;
                    neighbor.previousNode = closetNode;
                }
            } else {
                neighbor.heuristic = tempHeurastic;
                openset.unshift(neighbor);
                neighbor.previousNode = closetNode;
            }

        }

    }
    return closeset;

}

function getClosetNode(openset) {
    let winner = 0;
    for (let i = 0; i < openset.length; i++) {
        if (openset[i].heuristic < openset[winner].heuristic)
            winner = i;
    }
    const closetNode = openset[winner];
    openset.splice(winner, 1);
    return closetNode;
}