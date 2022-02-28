import { getAllNeighbours, heurasticDistance } from "../UtilityFunctions";
// f(n)=g(n)+h(n)
export function Astar(grid, startNode, endNode) {

    const openset = [];
    const closeset = [];
    startNode.distance = startNode.fscore = 0;
    openset.push(startNode);
    while (!!openset.length) {
        const closetNode = getClosetNode(openset);
        if (closetNode.fscore === Infinity) return closeset;

        closetNode.isVisited = true;
        closeset.push(closetNode);
        if (closetNode === endNode) {
            return closeset;
        }
        const neighbors = getAllNeighbours(closetNode, grid);

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
    return closeset;
}
//get min Fscore node
const getClosetNode = (openset) => {
    let winner = 0;
    for (let i = 0; i < openset.length; i++) {
        if (openset[i].fscore < openset[winner].fscore)
            winner = i;
        else if (openset[i].fscore === openset[winner].fscore) {
            if (openset[i].heurastic < openset[winner].heurastic)
                winner = i;
        }
    }
    const closetNode = openset[winner];
    openset.splice(winner, 1);
    return closetNode;
}

