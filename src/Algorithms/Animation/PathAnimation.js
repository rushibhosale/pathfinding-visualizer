
export function PathAnimation(visitedNodes, minimumPath, speed, setVisualizingState) {

    setVisualizingState(true);
    animate(0);
    async function animate(index) {
        return new Promise(resolve => setTimeout(() => {
            if (index === visitedNodes.length) {
                animateShortestPath(minimumPath, speed, setVisualizingState);
                return false;
            }
            const node = visitedNodes[index];

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
            // await sleep(speed);
            animate(index + 1);
        }, speed));


    }
}
function animateShortestPath(minimumPath, speed, setVisualizingState) {

    function animate(index) {
        if (index >= minimumPath.length) {
            setVisualizingState(false);
            return;
        }
        setTimeout(
            () => {
                const node = minimumPath[index];
                if (node.isStartNode)
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        `node start-node node-shortest-path`;
                else if (node.isFinishNode)
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        `node finish-node node-shortest-path`;
                else
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        `node node-shortest-path`;
                animate(index + 1);
            }, speed
        )
    }
    animate(0);


}