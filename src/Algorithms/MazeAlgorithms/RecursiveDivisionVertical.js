let walls = [];
export function RecursiveDivisionVertical(board, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls = true) {
    if (rowEnd - rowStart < 2 || colEnd - colStart < 2)
        return walls;

    if (surroundingWalls) {

        for (let i = 0; i < board.length; i++) {
            board[i][0].isWall = true;
            board[i][board[0].length - 1].isWall = true;
            walls.push(board[i][0]);
            walls.push(board[i][board.length - 1]);
        }
        for (let i = 0; i < board[0].length; i++) {
            board[0][i].isWall = true;
            board[board.length - 1][i].isWall = true;
            walls.push(board[0][i]);
            walls.push(board[board.length - 1][i]);
        }
        surroundingWalls = false;
    }


    if (orientation === "horizontal") {
        let y;
        while ((y = Math.floor(randomNumber(rowStart, rowEnd) / 2) * 2) === 0);
        let hole = Math.floor(randomNumber(colStart, colEnd) / 2) * 2 + 1;

        for (let i = colStart; i <= colEnd; i++) {
            const node = board[y][i];
            if (i === hole) node.isWall = false;
            else if (!node.isVisited && !(node.isStartNode || node.isFinishNode)) {
                walls.push(node);
                node.isWall = true;

            }
        }
        if (y - 1 - rowStart > colEnd - colStart) {
            RecursiveDivisionVertical(board, rowStart, y - 1, colStart, colEnd, orientation, surroundingWalls);
        } else {
            RecursiveDivisionVertical(board, rowStart, y - 1, colStart, colEnd, "vertical", surroundingWalls);
        }
        if (rowEnd - (y + 1) > colEnd - colStart) {
            RecursiveDivisionVertical(board, y + 1, rowEnd, colStart, colEnd, "vertical", surroundingWalls);
        } else {
            RecursiveDivisionVertical(board, y + 1, rowEnd, colStart, colEnd, "vertical", surroundingWalls);
        }
        // RecursiveDivisionVertical(board, rowStart, y, colStart, colEnd, "vertical");
        // RecursiveDivisionVertical(board, y + 1, rowEnd, colStart, colEnd, "vertical");
    }
    else {

        let x;
        while ((x = Math.floor(randomNumber(colStart, colEnd) / 2) * 2) === 0);
        let hole = Math.floor(randomNumber(rowStart, rowEnd) / 2) * 2 + 1;

        for (let i = rowStart; i <= rowEnd; i++) {
            const node = board[i][x];
            if (i === hole) node.isWall = false;
            else if (!node.isVisited && !(node.isStartNode || node.isFinishNode)) {
                walls.push(node);
                node.isWall = true;
            }
        }
        if (rowEnd - rowStart > x - 1 - colStart) {
            RecursiveDivisionVertical(board, rowStart, rowEnd, colStart, x - 1, "vertical", surroundingWalls);
        } else {
            RecursiveDivisionVertical(board, rowStart, rowEnd, colStart, x - 1, orientation, surroundingWalls);
        }
        if (rowEnd - rowStart > colEnd - (x + 1)) {
            RecursiveDivisionVertical(board, rowStart, rowEnd, x + 1, colEnd, "horizontal", surroundingWalls);
        } else {
            RecursiveDivisionVertical(board, rowStart, rowEnd, x + 1, colEnd, orientation, surroundingWalls);
        }
        // RecursiveDivisionVertical(board, rowStart, rowEnd, colStart, x, "horizontal");
        // RecursiveDivisionVertical(board, rowStart, rowEnd, x + 1, colEnd, "horizontal");
    }

    return walls;
}

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}