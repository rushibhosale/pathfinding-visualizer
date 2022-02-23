let walls = [];
export function RecursiveDivision(board, rowStart, rowEnd, colStart, colEnd, orientation) {
    if (rowEnd - rowStart < 2 || colEnd - colStart < 2)
        return walls;



    if (orientation === "horizontal") {
        let y = Math.floor(randomNumber(rowStart, rowEnd) / 2) * 2;
        while (y === 0)
            y = Math.floor(randomNumber(rowStart, rowEnd) / 2) * 2;

        let hole = Math.floor(randomNumber(colStart, colEnd) / 2) * 2 + 1;


        for (let i = colStart; i <= colEnd; i++) {
            if (i === hole) board[y][i].isWall = false;
            else {//board[y][i].isWall = true;
                if (!board[y][i].isVisited && !(board[y][i].isStartNode || board[y][i].isFinishNode)) {
                    walls.push(board[y][i]);
                    board[y][i].isWall = true;
                    // board[y][i].isVisited = true;
                }
            }
        }

        RecursiveDivision(board, rowStart, y, colStart, colEnd, "vertical");
        RecursiveDivision(board, y + 1, rowEnd, colStart, colEnd, "vertical");
    }
    else {

        let x = Math.floor(randomNumber(colStart, colEnd) / 2) * 2;
        while (x === 0)
            x = Math.floor(randomNumber(colStart, colEnd) / 2) * 2;

        let hole = Math.floor(randomNumber(rowStart, rowEnd) / 2) * 2 + 1;
        // console.log(x, hole);
        for (let i = rowStart; i <= rowEnd; i++) {
            if (i === hole) board[i][x].isWall = false;
            else {//board[i][x].isWall = true;
                if (!board[i][x].isVisited && !(board[i][x].isStart || board[i][x].isFinish)) {
                    walls.push(board[i][x]);
                    board[i][x].isWall = true;
                    // board[i][x].isVisited = true;
                }
            }
        }
        RecursiveDivision(board, rowStart, rowEnd, colStart, x, "horizontal");
        RecursiveDivision(board, rowStart, rowEnd, x + 1, colEnd, "horizontal");
    }

    return walls;
}

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}