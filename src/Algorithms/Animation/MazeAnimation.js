import { sleep } from "../UtilityFunctions";

export async function MazeAnimation(visitedNodes, speed = "normal") {

    for (let i = 0; i < visitedNodes.length; i++) {
        const node = visitedNodes[i];
        if (node.isWall) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
                "node wall";
        }

        await sleep(15);
    }
}