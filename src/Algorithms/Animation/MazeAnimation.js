

export async function MazeAnimation(visitedNodes, speed, setVisualizingState) {
    setVisualizingState(true);
    speed = speed === "normal" ? 20 : speed === "slow" ? 50 : 5;
    function animate(index) {
        if (index === visitedNodes.length) {
            setVisualizingState(false);
            return;
        }
        setTimeout(
            () => {
                const node = visitedNodes[index];
                if (node.isWall) {
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        "node wall wall-visited";
                }
                animate(index + 1);
            }, speed)
    }
    animate(0);
}