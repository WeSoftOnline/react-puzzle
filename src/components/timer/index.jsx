import React, {
    useState,
    forwardRef,
    useImperativeHandle,
    useEffect,
} from "react";

import Root from "./index.styled.js";
import {getCookie, setCookie} from "../../utils/cookies.js";

const Timer = forwardRef(function Timer(props, ref) {
    const [time, setTime] = useState(0);
    const [intervalID, setIntervalID] = useState(null);

    useImperativeHandle(ref, () => ({
        start() {
            const interval_id = setInterval(() => {
                setTime((time) => time + 1);
            }, 1000);
            setIntervalID(interval_id);
        },
        stop() {
            if (intervalID) clearInterval(intervalID);
            setTime(0)
        },
        getTime() {
            return displayTime(time);
        },

        save() {
            setCookie("player_timer", JSON.stringify({
                time
            }));
            return displayTime(time)
        },
        load() {
            let values = getCookie("player_timer");
            if (!values) return;

            values = JSON.parse(values);
            setTime(values.time);
        }
    }));

    const displayTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${minutes < 10 ? "0" : ""}${minutes}:${
            seconds < 10 ? "0" : ""
        }${seconds}`;
    };

    useEffect(() => {
        if (!ref.current) return;
        ref.current.start();
        ref.current.load();
    }, [ref]);

    return <Root>{displayTime(time)}</Root>;
});

export default Timer;
