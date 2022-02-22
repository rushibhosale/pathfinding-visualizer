import { getAllNeigbours } from "../UtilityFunctions";
export function Astar(grid, startNode, endNode) {
    console.log("Astart")
    const openset = [];
    const closeset = [];
    startNode.distance = startNode.fscore = 0;
    openset.push(startNode);
    while (!!openset) {
        const closetNode = getClosetNode(openset);
        if (closetNode.fscore === Infinity) return closeset;

        closetNode.isVisited = true;
        closeset.push(closetNode);
        if (closetNode === endNode) {
            console.log(closeset)
            return closeset;
        }
        const neighbors = getAllNeigbours(closetNode, grid);

        for (const neighbor of neighbors) {
            let newPath = false;

            // if (closeset.includes(neigbour) || neigbour.isWall) continue;
            let distance = closetNode.distance + 1;
            if (openset.includes(neighbor)) {
                if (distance < neighbor.distance) {
                    neighbor.distance = distance;
                    newPath = true;
                }
            }
            else {
                neighbor.distance = distance;
                newPath = true;
                openset.unshift(neighbor);

            }
            if (newPath) {
                neighbor.heuristic = heurasticDistance(neighbor, endNode);
                neighbor.fscore = neighbor.distance + neighbor.heuristic;
                neighbor.previousNode = closetNode;
            }
        }

    }
}
//get min Fscore node
const getClosetNode = (openset) => {
    let winner = 0;
    for (let i = 0; i < openset.length; i++) {
        if (openset[i].fscore < openset[winner].fscore)
            winner = i;
    }
    const closetNode = openset[winner];
    openset.splice(winner, 1);
    return closetNode;
}

// //heurasticDistance
// const heurasticDistance = (start, goal) => {
//     return Math.abs(start.row - goal.row) + Math.abs(start.col - goal.col);
// }
//Euclidean Distance
const heurasticDistance = (start, goal) => {
    const x = Math.abs(start.row - goal.row);
    const y = Math.abs(start.col - goal.col);
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}