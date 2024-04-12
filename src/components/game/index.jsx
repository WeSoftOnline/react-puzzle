import React, {useRef, useState} from "react";

import Grid from "../grid";
import Timer from "../timer";
import Preview from "../preview";
import Menu from "../menu";

import Root, {
    Grids,
    Container,
    ButtonRestart,
    ButtonStop,
    EndGame,
    ButtonPause,
    PauseGame,
    ButtonResume,
} from "./index.styled.js";
import {deleteCookie} from "../../utils/cookies.js";

export default function Game() {
    const timerRef = useRef();
    const playerRef = useRef();

    const [isMenu, setIsMenu] = useState(true);
    const [isEndGame, setIsEndGame] = useState(false);
    const [isPause, setIsPause] = useState(false);
    const [finishTime, setFinishTime] = useState(0);
    const [pauseTime, setPauseTime] = useState(0);

    const [image, setImage] = useState();
    const [numberPieces, setNumberPieces] = useState();

    const start = (numberPieces, image) => {
        deleteCookie('player');
        deleteCookie('player_timer');

        setNumberPieces(numberPieces);
        setImage(image);
        setIsMenu(false);
    };

    const pause = () => {
        playerRef.current.save();
        setPauseTime(timerRef.current.save());
        setIsPause(true);
    };

    const resume = () => {
        setIsPause(false);
    };

    const restart = () => {
        setIsEndGame(false);
        playerRef.current.reset();
        timerRef.current.stop();
        timerRef.current.start();
    };

    const stop = () => {
        setIsEndGame(false);
        setIsMenu(true);
    };

    const showEndGame = () => {
        setFinishTime(timerRef.current.getTime());
        setIsEndGame(true)
    }

    return (
        <Root>
            {isMenu && !isEndGame && <Menu onStart={start}/>}

            {!isMenu && !isEndGame && !isPause && <Container>
                <Timer ref={timerRef}/>
                <Preview image={image}/>
                <ButtonRestart onClick={restart}>Recommencer la partie</ButtonRestart>
                <ButtonStop onClick={stop}>Quitter la partie</ButtonStop>
                <ButtonPause onClick={pause}>Mettre en pause</ButtonPause>
                <Grids>
                    <Grid ref={playerRef} id={1} image={image} numberPieces={numberPieces}
                          handleGridFinished={showEndGame}/>
                </Grids>

            </Container>
            }

            {isPause && <PauseGame>
                <span>en pause à {pauseTime}!</span>
                <ButtonResume onClick={resume}>reprendre</ButtonResume>
            </PauseGame>}

            {isEndGame &&
                <EndGame>
                    <p>La partie est terminée en {finishTime}!</p>
                    <ButtonRestart onClick={restart}>Recommencer la partie</ButtonRestart>
                    <ButtonStop onClick={stop}>Quitter la partie</ButtonStop>
                </EndGame>}
        </Root>
    );
}
