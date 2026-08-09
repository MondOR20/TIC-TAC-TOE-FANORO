/* !!!!!!!!!!!!!!!!!!!!!!
   MODEPC.JS
   LOGIQUE DU PC
!!!!!!!!!!!!!!!!!!!!!! */


/* !!!!!!!!!!!!!!!!!!!!!!
   CHOISIR UNE CASE
!!!!!!!!!!!!!!!!!!!!!! */

function choisirCasePC() {

    if (
        typeof board === "undefined"
    ) {

        return -1;

    }


    const casesLibres = [];


    board.forEach(
        (value, index) => {

            if (value === "") {

                casesLibres.push(index);

            }

        }
    );


    if (casesLibres.length === 0) {

        return -1;

    }


    const randomIndex =
        Math.floor(
            Math.random() *
            casesLibres.length
        );


    return casesLibres[randomIndex];

}


/* !!!!!!!!!!!!!!!!!!!!!!
   TOUR DU PC
!!!!!!!!!!!!!!!!!!!!!! */

function jouerTourPC() {

    if (
        typeof gameMode === "undefined"
    ) {

        return;

    }


    if (gameMode !== "computer") {

        return;

    }


    if (
        typeof gameRunning !== "undefined" &&
        !gameRunning
    ) {

        return;

    }


    if (
        typeof currentPlayer === "undefined" ||
        currentPlayer !== player2
    ) {

        return;

    }


    const index =
        choisirCasePC();


    if (index === -1) {

        return;

    }


    jouerCoupPC(index);

}


/* !!!!!!!!!!!!!!!!!!!!!!
   COMPATIBILITE ANCIEN NOM
!!!!!!!!!!!!!!!!!!!!!! */

function computerPlay() {

    jouerTourPC();

}


/* !!!!!!!!!!!!!!!!!!!!!!
   MODE PC
!!!!!!!!!!!!!!!!!!!!!! */

function lancerModePC() {

    gameMode = "computer";

    localStorage.setItem(
        "modeJeu",
        "computer"
    );


    if (
        typeof afficherConfiguration ===
        "function"
    ) {

        afficherConfiguration();

    }

}


/* !!!!!!!!!!!!!!!!!!!!!!
   MODE 2 JOUEURS
!!!!!!!!!!!!!!!!!!!!!! */

function lancerModeDeuxJoueurs() {

    gameMode = "player";

    localStorage.setItem(
        "modeJeu",
        "player"
    );


    if (
        typeof afficherConfiguration ===
        "function"
    ) {

        afficherConfiguration();

    }

}


/* !!!!!!!!!!!!!!!!!!!!!!
   QUITTER MODE PC
!!!!!!!!!!!!!!!!!!!!!! */

function quitterModePC() {

    gameMode = "player";

    localStorage.setItem(
        "modeJeu",
        "player"
    );


    if (
        typeof gameRunning !==
        "undefined"
    ) {

        gameRunning = false;

    }

}