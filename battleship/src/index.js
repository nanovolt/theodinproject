import Game from "./app/game";
import Observable from "./app/observable";

import "./main.scss";
import "./assets/fonts/fa.css";

const dragAndDropObservable = new Observable();

const game = Game(dragAndDropObservable);

dragAndDropObservable.subscribe(game);

game.initButtons();
