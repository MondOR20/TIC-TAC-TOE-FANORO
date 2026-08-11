/* !!!!!!!!!!!!!!!!!!!!!
   ELEMENTS HTML
!!!!!!!!!!!!!!!!!!!!! */
const cells = document.querySelectorAll(".cell");
const turnText =
    document.querySelector("#currentTurn");
const scoreXElement =
    document.querySelector("#score-x");
const scoreOElement =
    document.querySelector("#score-o");
const mobileScoreX =
    document.querySelector("#mobile-score-x");
const mobileScoreO =
    document.querySelector("#mobile-score-o");
const retryButton =
    document.querySelector("#retry");
const newGameButton =
    document.querySelector("#newGame");
const winnerPopup =
    document.querySelector("#winnerPopup");
const winnerTitle =
    document.querySelector("#winnerTitle");
const winnerMessage =
    document.querySelector("#winnerMessage");
const closeWinner =
    document.querySelector("#closeWinner");
/* !!!!!!!!!!!!!!!!!!!!!
   DONNEES
!!!!!!!!!!!!!!!!!!!!! */
let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];
let currentPlayer = null;
let gameRunning = false;
let pcThinking = false;
const MAX_MOVES_PER_PLAYER = 3;

let player1Moves = 0;
let player2Moves = 0;
let gameMode =
    localStorage.getItem("modeJeu") || "computer";
let player1 = {
    name: "",
    symbol: "X"
};
let player2 = {
    name: "",
    symbol: "O"
};
/* !!!!!!!!!!!!!!!!!!!!!
   SCORES
!!!!!!!!!!!!!!!!!!!!! */
let xScore =
    Number(localStorage.getItem("xScore")) || 0;
let oScore =
    Number(localStorage.getItem("oScore")) || 0;
/* !!!!!!!!!!!!!!!!!!!!!
   COMBINAISONS GAGNANTES
!!!!!!!!!!!!!!!!!!!!! */
const patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
/* !!!!!!!!!!!!!!!!!!!!!
   SCORE
!!!!!!!!!!!!!!!!!!!!! */
function updateScore() {
    if (scoreXElement) {
        scoreXElement.textContent = xScore;
    }
    if (scoreOElement) {
        scoreOElement.textContent = oScore;
    }
    if (mobileScoreX) {
        mobileScoreX.textContent = xScore;
    }
    if (mobileScoreO) {
        mobileScoreO.textContent = oScore;
    }
}
/* !!!!!!!!!!!!!!!!!!!!!
   AFFICHER JOUEURS
!!!!!!!!!!!!!!!!!!!!! */
function updatePlayersDisplay() {
    const playerXTitle =
        document.querySelector(".player-x h3");
    const playerXMode =
        document.querySelector(".player-x p");
    const playerOTitle =
        document.querySelector(".player-o h3");
    const playerOMode =
        document.querySelector("#player-o-mode");
    if (playerXTitle) {
        playerXTitle.textContent =
            player1.name || "JOUEUR X";
    }
    if (playerXMode) {
        playerXMode.textContent =
            "Vous • " + player1.symbol;
    }
    if (playerOTitle) {
        playerOTitle.textContent =
            player2.name || "JOUEUR O";
    }
    if (playerOMode) {
        if (gameMode === "computer") {
            playerOMode.textContent =
                "Ordinateur • " + player2.symbol;
        } else {
            playerOMode.textContent =
                "Joueur 2 • " + player2.symbol;
        }
    }
}
/* !!!!!!!!!!!!!!!!!!!!!
   TOUR
!!!!!!!!!!!!!!!!!!!!! */
function updateTurn() {
    if (!turnText || !currentPlayer) {
        return;
    }
    turnText.textContent =
        currentPlayer.symbol;
}
/* !!!!!!!!!!!!!!!!!!!!!
   DEMARRER PARTIE
!!!!!!!!!!!!!!!!!!!!! */
function startGame() {
    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];
    gameRunning = true;
    pcThinking = false;
    currentPlayer = player1;
    player1Moves = 0;
    player2Moves = 0;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove(
            "winner",
            "x",
            "o"
        );
    });
    updatePlayersDisplay();
    updateTurn();
    updateScore();
}
/* !!!!!!!!!!!!!!!!!!!!!
   RESET PLATEAU
!!!!!!!!!!!!!!!!!!!!! */
function resetBoard() {
    if (!player1.name) {
        return;
    }
    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];
    gameRunning = true;
    pcThinking = false;
    currentPlayer = player1;
    player1Moves = 0;
    player2Moves = 0;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove(
            "winner",
            "x",
            "o"
        );
    });
    updateTurn();
}
/* !!!!!!!!!!!!!!!!!!!!!
   CHANGER JOUEUR
!!!!!!!!!!!!!!!!!!!!! */
function changePlayer() {
    if (currentPlayer === player1) {
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    }
    updateTurn();
}
/* !!!!!!!!!!!!!!!!!!!!!
   CLIC SUR CASE
!!!!!!!!!!!!!!!!!!!!! */
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        playCell(index);
    });
});
/* !!!!!!!!!!!!!!!!!!!!!
   JOUER UNE CASE
!!!!!!!!!!!!!!!!!!!!! */
function playCell(index) {

    if (!gameRunning) {
        return;
    }

    if (pcThinking) {
        return;
    }

    if (board[index] !== "") {
        return;
    }

    /* =====================================
       LIMITE DE 3 COUPS PAR JOUEUR
    ===================================== */

    if (
        currentPlayer === player1 &&
        player1Moves >= MAX_MOVES_PER_PLAYER
    ) {
        return;
    }

    if (
        currentPlayer === player2 &&
        player2Moves >= MAX_MOVES_PER_PLAYER
    ) {
        return;
    }

    /* =====================================
       EMPÊCHER LE CLIC PENDANT LE TOUR PC
    ===================================== */

    if (
        gameMode === "computer" &&
        currentPlayer === player2
    ) {
        return;
    }
    /* Empêcher le joueur de jouer pendant le tour PC */
    if (
        gameMode === "computer" &&
        currentPlayer === player2
    ) {
        return;
    }
    /* Jouer */
    board[index] =
    currentPlayer.symbol;
    if (currentPlayer === player1) {
    player1Moves++;
    } else if (currentPlayer === player2) {
    player2Moves++;
    }
renderCell(index);
    /* Vérifier résultat */
    checkWinner();
    if (!gameRunning) {
        return;
    }
    /* MODE PC */
    if (
        gameMode === "computer" &&
        currentPlayer === player1
    ) {
        currentPlayer = player2;
        updateTurn();
        pcThinking = true;
        setTimeout(() => {
            if (
                typeof jouerTourPC === "function"
            ) {
                jouerTourPC();
            }
        }, 500);
    } else {
        changePlayer();
    }
}
/* !!!!!!!!!!!!!!!!!!!!!
   AFFICHER CASE
!!!!!!!!!!!!!!!!!!!!! */
function renderCell(index) {
    const cell = cells[index];
    if (!cell) {
        return;
    }
    cell.textContent =
        board[index];
    cell.classList.remove(
        "x",
        "o"
    );
    if (board[index] === "X") {
        cell.classList.add("x");
    }
    if (board[index] === "O") {
        cell.classList.add("o");
    }
}
/* !!!!!!!!!!!!!!!!!!!!!
   JOUER COUP PC
!!!!!!!!!!!!!!!!!!!!! */
function jouerCoupPC(index) {
    if (!gameRunning) {
        return false;
    }
    if (gameMode !== "computer") {
        return false;
    }
    if (currentPlayer !== player2) {
        return false;
    }
    if (board[index] !== "") {
        return false;
    }
    
    if (player2Moves >= MAX_MOVES_PER_PLAYER) {
        return false;
    }
    board[index] =
        player2.symbol;
    renderCell(index);
    checkWinner();
    if (!gameRunning) {
        pcThinking = false;
        return true;
    }
    currentPlayer = player1;
    pcThinking = false;
    updateTurn();
    return true;
}
/* !!!!!!!!!!!!!!!!!!!!!
   VERIFICATION VICTOIRE
!!!!!!!!!!!!!!!!!!!!! */
function checkWinner() {
    let winner = null;
    let winningPattern = null;
    for (const pattern of patterns) {
        const a =
            board[pattern[0]];
        const b =
            board[pattern[1]];
        const c =
            board[pattern[2]];
        if (
            a !== "" &&
            a === b &&
            b === c
        ) {
            winner = a;
            winningPattern =
                pattern;
            break;
        }
    }
    /* !!!!!!!!!!!!!!!!!!!!!!
       VICTOIRE
    !!!!!!!!!!!!!!!!!!!!!! */
    if (winner) {
        gameRunning = false;
        pcThinking = false;
        winningPattern.forEach(index => {
            if (cells[index]) {
                cells[index].classList.add(
                    "winner"
                );
            }
        });
        let winnerPlayer;
        if (
            winner === player1.symbol
        ) {
            winnerPlayer = player1;
            xScore++;
            localStorage.setItem(
                "xScore",
                xScore
            );
        } else {
            winnerPlayer = player2;
            oScore++;
            localStorage.setItem(
                "oScore",
                oScore
            );
        }
        updateScore();
        saveGameHistory(
            winnerPlayer.name,
            "win"
        );
        savePlayerScore(
            winnerPlayer
        );
        setTimeout(() => {

        showWinner(
            winnerPlayer.name +
                " a gagné !"
         );

        }, 1000);
    }
    /* !!!!!!!!!!!!!!!!!!!!!!
       MATCH NUL
    !!!!!!!!!!!!!!!!!!!!!! */
    if (!board.includes("")) {
        gameRunning = false;
        pcThinking = false;
        saveGameHistory(
            "Match nul",
            "draw"
        );
        setTimeout(() => {

        showWinner(
        "Match nul !"
        );

}, 1000);
    }
}
/* !!!!!!!!!!!!!!!!!!!!!
   POPUP
!!!!!!!!!!!!!!!!!!!!! */
function showWinner(message) {
    if (!winnerPopup) {
        return;
    }
    if (winnerTitle) {
        winnerTitle.textContent =
            message;
    }
    if (winnerMessage) {
        winnerMessage.textContent =
            "Bravo ! Belle partie 🎉";
    }
    winnerPopup.classList.add(
        "active"
    );
}
/* !!!!!!!!!!!!!!!!!!!!!
   FERMER POPUP
!!!!!!!!!!!!!!!!!!!!! */
if (closeWinner) {
    closeWinner.addEventListener(
        "click",
        () => {
            winnerPopup.classList.remove(
                "active"
            );
            resetBoard();
        }
    );
}
/* !!!!!!!!!!!!!!!!!!!!!
   REJOUER
!!!!!!!!!!!!!!!!!!!!! */
if (retryButton) {
    retryButton.addEventListener(
        "click",
        () => {
            resetBoard();
        }
    );
}
/* !!!!!!!!!!!!!!!!!!!!!
   NOUVELLE PARTIE
!!!!!!!!!!!!!!!!!!!!! */
if (newGameButton) {
    newGameButton.addEventListener(
        "click",
        () => {
            if (winnerPopup) {
                winnerPopup.classList.remove(
                    "active"
                );
            }
            gameRunning = false;
            pcThinking = false;
            if (
                typeof afficherConfiguration ===
                "function"
            ) {
                afficherConfiguration();
            }
        }
    );
}
/* !!!!!!!!!!!!!!!!!!!!!
   HISTORIQUE
!!!!!!!!!!!!!!!!!!!!! */
function saveGameHistory(
    winner,
    result
) {
    let history =
        JSON.parse(
            localStorage.getItem(
                "gameHistory"
            )
        ) || [];
    history.push({
        date:
            new Date().toLocaleString(
                "fr-FR"
            ),
        mode:
            gameMode,
        playerX:
            player1.name,
        playerO:
            player2.name,
        winner:
            winner,
        result:
            result
    });
    localStorage.setItem(
        "gameHistory",
        JSON.stringify(history)
    );
}
/* !!!!!!!!!!!!!!!!!!!!!
   SCORES DES JOUEURS
!!!!!!!!!!!!!!!!!!!!! */
function savePlayerScore(player) {
    let scores =
        JSON.parse(
            localStorage.getItem(
                "scores"
            )
        ) || [];
    let existing =
        scores.find(
            item =>
                item.name === player.name &&
                item.mode === gameMode
        );
    if (existing) {
        existing.wins++;
    } else {
        scores.push({
            name:
                player.name,
            wins:
                1,
            symbol:
                player.symbol,
            mode:
                gameMode
        });
    }
    localStorage.setItem(
        "scores",
        JSON.stringify(scores)
    );
}
/* !!!!!!!!!!!!!!!!!!!!!
   INITIALISATION
!!!!!!!!!!!!!!!!!!!!! */
updateScore();