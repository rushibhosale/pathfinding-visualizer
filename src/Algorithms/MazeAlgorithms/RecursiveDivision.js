let walls = [];
export function RecursiveDivision(board, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls = true) {
    if (rowEnd - rowStart < 2 || colEnd - colStart < 2)
        return walls;

    if (surroundingWalls) {
        walls = [];
        for (let i = 0; i < board.length; i++) {
            board[i][0].isWall = true;
            board[i][board[0].length - 1].isWall = true;
            walls.push(board[i][0]);
            walls.push(board[i][board[0].length - 1]);
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
                node.isWall = true;
                walls.push(node);
            }
        }
        if (y - 1 - rowStart > colEnd - colStart) {
            RecursiveDivision(board, rowStart, y - 1, colStart, colEnd, orientation, surroundingWalls);
        } else {
            RecursiveDivision(board, rowStart, y - 1, colStart, colEnd, "vertical", surroundingWalls);
        }
        if (rowEnd - (y + 1) > colEnd - colStart) {
            RecursiveDivision(board, y + 1, rowEnd, colStart, colEnd, orientation, surroundingWalls);
        } else {
            RecursiveDivision(board, y + 1, rowEnd, colStart, colEnd, "vertical", surroundingWalls);
        }
        // RecursiveDivision(board, rowStart, y, colStart, colEnd, "vertical");
        // RecursiveDivision(board, y + 1, rowEnd, colStart, colEnd, "vertical");
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
            RecursiveDivision(board, rowStart, rowEnd, colStart, x - 1, "horizontal", surroundingWalls);
        } else {
            RecursiveDivision(board, rowStart, rowEnd, colStart, x - 1, orientation, surroundingWalls);
        }
        if (rowEnd - rowStart > colEnd - (x + 1)) {
            RecursiveDivision(board, rowStart, rowEnd, x + 1, colEnd, "horizontal", surroundingWalls);
        } else {
            RecursiveDivision(board, rowStart, rowEnd, x + 1, colEnd, orientation, surroundingWalls);
        }
        // RecursiveDivision(board, rowStart, rowEnd, colStart, x, "horizontal");
        // RecursiveDivision(board, rowStart, rowEnd, x + 1, colEnd, "horizontal");
    }

    return walls;
}

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}