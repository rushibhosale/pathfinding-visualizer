export function RandomMaze(grid) {
    const walls = [];
    grid.forEach(row => {
        row.forEach(node => {
            if (!node.isStartNode && !node.isFinishNode) {
                if (Math.random() < 0.35) {
                    node.isWall = true;
                    walls.push(node);

                }
            }
        });
    });
    return walls.sort(() => Math.random() - .5);
}