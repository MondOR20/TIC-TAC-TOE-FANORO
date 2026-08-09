/* !!!!!!!!!!!!!!!!!!!!!!
   LIAISON.JS
   CONTROLE GENERAL DE L'APPLICATION
!!!!!!!!!!!!!!!!!!!!!! */
document.addEventListener(
    "DOMContentLoaded",
    () => {
        /* !!!!!!!!!!!!!!!!!!!!!!
           ELEMENTS
        !!!!!!!!!!!!!!!!!!!!!! */
        const screens = {
            home:
                document.getElementById(
                    "homeScreen"
                ),
            config:
                document.getElementById(
                    "configScreen"
                ),
            game:
                document.getElementById(
                    "gameScreen"
                ),
            scores:
                document.getElementById(
                    "scoresScreen"
                ),
            history:
                document.getElementById(
                    "historyScreen"
                ),
            settings:
                document.getElementById(
                    "settingsScreen"
                ),
            about:
                document.getElementById(
                    "aboutScreen"
                )
        };
        const navLinks =
            document.querySelectorAll(
                "[data-screen]"
            );
        const sideMenu =
            document.getElementById(
                "sideMenu"
            );
        const menuOverlay =
            document.getElementById(
                "menuOverlay"
            );
        const menuToggle =
            document.getElementById(
                "menuToggle"
            );
        const closeMenu =
            document.getElementById(
                "closeMenu"
            );
        const modePlayer =
            document.getElementById(
                "modePlayer"
            );
        const contrePC =
            document.getElementById(
                "contrePC"
            );
        const btnStart =
            document.getElementById(
                "btnStart"
            );
        const btnSettings =
            document.getElementById(
                "btnSettings"
            );
        const playerConfig =
            document.getElementById(
                "playerConfig"
            );
        const playerOConfig =
            document.getElementById(
                "playerOConfig"
            );
        const playerXName =
            document.getElementById(
                "playerXName"
            );
        const playerOName =
            document.getElementById(
                "playerOName"
            );
        const confirmPlayers =
            document.getElementById(
                "confirmPlayers"
            );
        const configError =
            document.getElementById(
                "configError"
            );
        const symbolButtons =
            document.querySelectorAll(
                "#playerConfig > .config-box > .symbols .symbol-btn"
            );
        /* !!!!!!!!!!!!!!!!!!!!!!
           MODE
        !!!!!!!!!!!!!!!!!!!!!! */
        let selectedSymbol =
            localStorage.getItem(
                "symboleJoueur"
            ) || "X";
        gameMode =
            localStorage.getItem(
                "modeJeu"
            ) || "computer";
        /* !!!!!!!!!!!!!!!!!!!!!!
           NAVIGATION
        !!!!!!!!!!!!!!!!!!!!!! */
        function showScreen(name) {
            Object.values(screens)
                .forEach(screen => {
                    if (screen) {
                        screen.classList.remove(
                            "active"
                        );
                    }
                });
            if (screens[name]) {
                screens[name].classList.add(
                    "active"
                );
            }
            document
                .querySelectorAll(
                    ".nav-link, .side-link"
                )
                .forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.dataset.screen === name
                    );
                });
            closeSideMenu();
        }
        window.showScreen =
            showScreen;
        /* !!!!!!!!!!!!!!!!!!!!!!
           BOUTONS NAVIGATION
        !!!!!!!!!!!!!!!!!!!!!! */
        navLinks.forEach(link => {
            link.addEventListener(
                "click",
                () => {
                    const target =
                        link.dataset.screen;
                    if (screens[target]) {
                        showScreen(
                            target
                        );
                    }
                }
            );
        });
        /* !!!!!!!!!!!!!!!!!!!!!!
           MENU MOBILE
        !!!!!!!!!!!!!!!!!!!!!! */
        function openSideMenu() {
            if (sideMenu) {
                sideMenu.classList.add(
                    "open"
                );
            }
            if (menuOverlay) {
                menuOverlay.classList.add(
                    "active"
                );
            }
        }
        function closeSideMenu() {
            if (sideMenu) {
                sideMenu.classList.remove(
                    "open"
                );
            }
            if (menuOverlay) {
                menuOverlay.classList.remove(
                    "active"
                );
            }
        }
        if (menuToggle) {
            menuToggle.addEventListener(
                "click",
                openSideMenu
            );
        }
        if (closeMenu) {
            closeMenu.addEventListener(
                "click",
                closeSideMenu
            );
        }
        if (menuOverlay) {
            menuOverlay.addEventListener(
                "click",
                closeSideMenu
            );
        }
        /* !!!!!!!!!!!!!!!!!!!!!!
           AFFICHER CONFIGURATION
        !!!!!!!!!!!!!!!!!!!!!! */
        function afficherConfiguration() {
            if (playerConfig) {
                playerConfig.style.display =
                    "block";
            }
            prepareMode();
            showScreen(
                "config"
            );
        }
        window.afficherConfiguration =
            afficherConfiguration;
        /* !!!!!!!!!!!!!!!!!!!!!!
           CACHER CONFIGURATION
        !!!!!!!!!!!!!!!!!!!!!! */
        function hideConfiguration() {
            if (playerConfig) {
                playerConfig.style.display =
                    "none";
            }
        }
        /* !!!!!!!!!!!!!!!!!!!!!!
           PREPARER MODE
        !!!!!!!!!!!!!!!!!!!!!! */
        function prepareMode() {
            if (
                gameMode ===
                "computer"
            ) {
                if (playerOConfig) {
                    playerOConfig.style.display =
                        "none";
                }
                if (playerOName) {
                    playerOName.value =
                        "Ordinateur";
                }
            } else {
                if (playerOConfig) {
                    playerOConfig.style.display =
                        "block";
                }
                if (
                    playerOName &&
                    playerOName.value ===
                    "Ordinateur"
                ) {
                    playerOName.value =
                        "";
                }
            }
            if (configError) {
                configError.textContent =
                    "";
            }
        }
        /* !!!!!!!!!!!!!!!!!!!!!!
           MODE 1 JOUEUR
        !!!!!!!!!!!!!!!!!!!!!! */
        if (contrePC) {
            contrePC.addEventListener(
                "click",
                () => {
                    lancerModePC();
                }
            );
        }
        /* !!!!!!!!!!!!!!!!!!!!!!
           MODE 2 JOUEURS
        !!!!!!!!!!!!!!!!!!!!!! */
        if (modePlayer) {
            modePlayer.addEventListener(
                "click",
                () => {
                    lancerModeDeuxJoueurs();
                }
            );
        }
        /* !!!!!!!!!!!!!!!!!!!!!!
           BOUTON COMMENCER
        !!!!!!!!!!!!!!!!!!!!!! */
        if (btnStart) {
            btnStart.addEventListener(
                "click",
                () => {
                    afficherConfiguration();
                }
            );
        }
        /* !!!!!!!!!!!!!!!!!!!!!!
           BOUTON PARAMETRES
        !!!!!!!!!!!!!!!!!!!!!! */
        if (btnSettings) {
            btnSettings.addEventListener(
                "click",
                () => {
                    showScreen(
                        "settings"
                    );
                }
            );
        }
        /* !!!!!!!!!!!!!!!!!!!!!!
           CHOIX SYMBOLE
        !!!!!!!!!!!!!!!!!!!!!! */
        symbolButtons.forEach(button => {
            button.addEventListener(
                "click",
                () => {
                    symbolButtons
                        .forEach(btn => {
                            btn.classList.remove(
                                "active"
                            );
                        });
                    button.classList.add(
                        "active"
                    );
                    selectedSymbol =
                        button.dataset.symbol;
                    localStorage.setItem(
                        "symboleJoueur",
                        selectedSymbol
                    );
                }
            );
        });
        /* !!!!!!!!!!!!!!!!!!!!!!
           RESTAURER SYMBOLE
        !!!!!!!!!!!!!!!!!!!!!! */
        symbolButtons.forEach(button => {
            if (
                button.dataset.symbol ===
                selectedSymbol
            ) {
                button.classList.add(
                    "active"
                );
            } else {
                button.classList.remove(
                    "active"
                );
            }
        });
        /* !!!!!!!!!!!!!!!!!!!!!!
           CONFIRMER JOUEURS
        !!!!!!!!!!!!!!!!!!!!!! */
        if (confirmPlayers) {
            confirmPlayers.addEventListener(
                "click",
                () => {
                    const name1 =
                        playerXName
                            ? playerXName.value.trim()
                            : "";
                    const name2 =
                        playerOName
                            ? playerOName.value.trim()
                            : "";
                    /* -----------------------------
                       NOM JOUEUR 1
                    ----------------------------- */
                    if (name1 === "") {
                        if (configError) {
                            configError.textContent =
                                "Veuillez entrer votre nom.";
                        }
                        return;
                    }
                    /* -----------------------------
                       NOM JOUEUR 2
                    ----------------------------- */
                    if (
                        gameMode === "player" &&
                        name2 === ""
                    ) {
                        if (configError) {
                            configError.textContent =
                                "Veuillez entrer le nom du joueur 2.";
                        }
                        return;
                    }
                    /* -----------------------------
                       SYMBOLE
                    ----------------------------- */
                    if (!selectedSymbol) {
                        if (configError) {
                            configError.textContent =
                                "Choisissez votre symbole.";
                        }
                        return;
                    }
                    /* -----------------------------
                       JOUEUR 1
                    ----------------------------- */
                    player1 = {
                        name:
                            name1,
                        symbol:
                            selectedSymbol
                    };
                    /* -----------------------------
                       JOUEUR 2
                    ----------------------------- */
                    const secondSymbol =
                        selectedSymbol === "X"
                            ? "O"
                            : "X";
                    if (
                        gameMode ===
                        "computer"
                    ) {
                        player2 = {
                            name:
                                "Ordinateur",
                            symbol:
                                secondSymbol
                        };
                    } else {
                        player2 = {
                            name:
                                name2,
                            symbol:
                                secondSymbol
                        };
                    }
                    if (configError) {
                        configError.textContent =
                            "";
                    }
                    hideConfiguration();
                    showScreen(
                        "game"
                    );
                    startGame();
                }
            );
        }
        /* !!!!!!!!!!!!!!!!!!!!!!
           SCORES
        !!!!!!!!!!!!!!!!!!!!!! */
        const tabs =
            document.querySelectorAll(
                ".tab"
            );
        tabs.forEach(tab => {
            tab.addEventListener(
                "click",
                () => {
                    tabs.forEach(t =>
                        t.classList.remove(
                            "active"
                        )
                    );
                    tab.classList.add(
                        "active"
                    );
                    loadScores(
                        tab.dataset.mode
                    );
                }
            );
        });
        /* !!!!!!!!!!!!!!!!!!!!!!
           HISTORIQUE
        !!!!!!!!!!!!!!!!!!!!!! */
        const clearHistory =
            document.getElementById(
                "clear-history"
            );
        if (clearHistory) {
            clearHistory.addEventListener(
                "click",
                () => {
                    localStorage.removeItem(
                        "gameHistory"
                    );
                    displayHistory([]);
                }
            );
        }
        /* !!!!!!!!!!!!!!!!!!!!!!
           CHARGER SCORES
        !!!!!!!!!!!!!!!!!!!!!! */
        function getGames() {
            const data =
                localStorage.getItem(
                    "gameHistory"
                );
            return data
                ? JSON.parse(data)
                : [];
        }
        function loadScores(mode) {
            const games =
                getGames();
            const players = {};
            games.forEach(game => {
                if (
                    game.mode !==
                    mode
                ) {
                    return;
                }
                if (
                    game.result !==
                    "win"
                ) {
                    return;
                }
                const winner =
                    game.winner;
                if (
                    !players[winner]
                ) {
                    players[winner] = 0;
                }
                players[winner]++;
            });
            let ranking =
                Object.entries(
                    players
                );
            ranking.sort(
                (a, b) =>
                    b[1] - a[1]
            );
            displayRanking(
                ranking
            );
        }
        function displayRanking(players) {
            const ranking =
                document.getElementById(
                    "ranking"
                );
            if (!ranking) {
                return;
            }
            ranking.innerHTML =
                "";
            const medals = [
                "🥇",
                "🥈",
                "🥉",
                "4",
                "5"
            ];
            for (
                let i = 0;
                i < 5;
                i++
            ) {
                const player =
                    players[i];
                ranking.innerHTML += `
                    <div class="player-card">
                        <div class="left">
                            <span class="position">
                                ${medals[i]}
                            </span>
                            <span>
                                ${player ? player[0] : "-"}
                            </span>
                        </div>
                        <span class="score">
                            ${player ? player[1] : 0}
                        </span>
                    </div>
                `;
            }
        }
        /* !!!!!!!!!!!!!!!!!!!!!!
           AFFICHER HISTORIQUE
        !!!!!!!!!!!!!!!!!!!!!! */
        function displayHistory(games) {
            const historyList =
                document.getElementById(
                    "history-list"
                );
            if (!historyList) {
                return;
            }
            historyList.innerHTML =
                "";
            if (
                games.length === 0
            ) {
                historyList.innerHTML = `
                    <div class="empty-state">
                        <i class="bi bi-clock-history"></i>
                        <h3>
                            Aucun historique
                        </h3>
                        <p>
                            Vos parties apparaîtront ici.
                        </p>
                    </div>
                `;
                return;
            }
            [...games]
                .reverse()
                .forEach(game => {
                    let result;
                    if (
                        game.result ===
                        "draw"
                    ) {
                        result =
                            "Match nul";
                    } else {
                        result =
                            game.winner +
                            " a gagné";
                    }
                    historyList.innerHTML += `
                        <div class="history-card">
                            <div class="history-top">
                                <strong>
                                    ${
                                        game.mode ===
                                        "computer"
                                            ? "1 Joueur"
                                            : "2 Joueurs"
                                    }
                                </strong>
                                <span>
                                    ${game.date}
                                </span>
                            </div>
                            <div class="players">
                                <span>
                                    ❌ ${game.playerX}
                                </span>
                                <span>
                                    ⭕ ${game.playerO}
                                </span>
                            </div>
                            <div class="winner">
                                🏆 ${result}
                            </div>
                        </div>
                    `;
                });
        }
        /* !!!!!!!!!!!!!!!!!!!!!!
           CHARGER HISTORIQUE
        !!!!!!!!!!!!!!!!!!!!!! */
        displayHistory(
            getGames()
        );
        /* !!!!!!!!!!!!!!!!!!!!!!
           CHARGER SCORES
        !!!!!!!!!!!!!!!!!!!!!! */
        loadScores(
            "computer"
        );
        /* !!!!!!!!!!!!!!!!!!!!!!
           THEME
        !!!!!!!!!!!!!!!!!!!!!! */
        const themeCards =
            document.querySelectorAll(
                ".theme-card"
            );
        const savedTheme =
            localStorage.getItem(
                "theme"
            ) || "dark";
        function applyTheme(theme) {
            document.body.classList.remove(
                "light"
            );
            if (theme === "light") {
                document.body.classList.add(
                    "light"
                );
            }
            if (theme === "system") {
                const systemDark =
                    window.matchMedia(
                        "(prefers-color-scheme: dark)"
                    ).matches;
                if (!systemDark) {
                    document.body.classList.add(
                        "light"
                    );
                }
            }
            themeCards.forEach(card => {
                card.classList.toggle(
                    "active",
                    card.dataset.theme ===
                    theme
                );
            });
            localStorage.setItem(
                "theme",
                theme
            );
        }
        themeCards.forEach(card => {
            card.addEventListener(
                "click",
                () => {
                    applyTheme(
                        card.dataset.theme
                    );
                }
            );
        });
        applyTheme(
            savedTheme
        );
        /* !!!!!!!!!!!!!!!!!!!!!!
           SONS
        !!!!!!!!!!!!!!!!!!!!!! */
        const soundToggle =
            document.getElementById(
                "soundToggle"
            );
        if (soundToggle) {
            const savedSound =
                localStorage.getItem(
                    "sound"
                );
            if (savedSound !== null) {
                soundToggle.checked =
                    savedSound === "true";
            }
            soundToggle.addEventListener(
                "change",
                () => {
                    localStorage.setItem(
                        "sound",
                        soundToggle.checked
                    );
                }
            );
        }
        /* !!!!!!!!!!!!!!!!!!!!!!
           RESET SCORES
        !!!!!!!!!!!!!!!!!!!!!! */
        const resetScores =
            document.getElementById(
                "resetScores"
            );
        if (resetScores) {
            resetScores.addEventListener(
                "click",
                () => {
                    localStorage.removeItem(
                        "xScore"
                    );
                    localStorage.removeItem(
                        "oScore"
                    );
                    localStorage.removeItem(
                        "scores"
                    );
                    xScore = 0;
                    oScore = 0;
                    updateScore();
                    loadScores(
                        "computer"
                    );
                }
            );
        }
        /* !!!!!!!!!!!!!!!!!!!!!!
           DEMARRAGE
        !!!!!!!!!!!!!!!!!!!!!! */
        showScreen(
            "home"
        );
        prepareMode();
    }
);