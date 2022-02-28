

export async function MazeAnimation(visitedNodes, speed, setVisualizingState) {
    setVisualizingState(true);
    speed = 20;
    async function animate(index) {
        if (index === visitedNodes.length) {
            setVisualizingState(false);
            return;
        }
        setTimeout(
            () => {
                const node = visitedNodes[index];
                if (node.isWall) {
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        "node wall";
                }
                animate(index + 1);
            }, speed
        )

    }
    await animate(0);
}