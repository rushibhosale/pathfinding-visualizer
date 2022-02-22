import { sleep } from "../UtilityFunctions";

export async function PathAnimation(visitedNodes, minimumPath) {
    let speed = 3;
    for (let i = 0; visitedNodes && i <= visitedNodes.length; i++) {
        const node = visitedNodes[i];
        if (i === visitedNodes.length) {
            await animateShortestPath(minimumPath, speed);
            return false;
        }

        if (node.isStartNode) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
                `node start-node node-visited`;

        }
        else if (node.isFinishNode)
            document.getElementById(`node-${node.row}-${node.col}`).className =
                `node finish-node node-visited`;
        else
            document.getElementById(`node-${node.row}-${node.col}`).className =
                `node node-visited`;

        await sleep(speed * 3);
    }

    // await animateShortestPath(minimumPath, speed);
}
async function animateShortestPath(minimumPath, speed) {
    for (let i = 0; i < minimumPath.length; i++) {
        const node = minimumPath[i];
        if (node.isStartNode)
            document.getElementById(`node-${node.row}-${node.col}`).className =
                `node start-node node-shortest-path`;
        else if (node.isFinishNode)
            document.getElementById(`node-${node.row}-${node.col}`).className =
                `node finish-node node-shortest-path`;
        else
            document.getElementById(`node-${node.row}-${node.col}`).className =
                `node node-shortest-path`;

        await sleep(speed);
    }
}