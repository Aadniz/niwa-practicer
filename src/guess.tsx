import { ISettings } from "./settings";
import {InputEvent, useState, useCallback, useRef, useEffect} from "react";

interface GuessProps {
    settings: ISettings;
    score: number;
    onScoreChange: (value: number) => void;
    randomTime: Date;
    onRandomTimeChange: (value: Date) => void;
}

const INITIAL_SCORE_MULTIPLIER = 10;
const SCORE_FALLOFF_TIME = 5;  // seconds
const MIN_MULTIPLIER = 1;

export const Guess = ({ settings, score, onScoreChange, randomTime, onRandomTimeChange }: GuessProps) => {
    const guesses = useRef<Set<String>>(new Set<string>());
    const [startTime, setStartTime] = useState(new Date());
    const [value, setValue] = useState("");
    const [validated, setValidated] = useState<boolean | null>(null);
    const [correct, setCorrect] = useState<boolean | null>(null);
    const [scoreMultiplier, setScoreMultiplier] = useState<number>(INITIAL_SCORE_MULTIPLIER);
    const [timer, setTime] = useState<number>(0.00);

    const validateInput = (input: string): boolean => {
        if (input[0] === ":") return false;
        if (input.split(":").length > 2) return false;
        if (input.trim() !== "" && !/^([0-9:]+)$/.test(input)) return false;
        return true;
    };

    const formatInput = (input: string): string => {
        let formatted = input;
        if (input.endsWith(":")) {
            formatted = input.slice(0, -1);
        }
        if (/^\d{3}/.test(formatted)) {
            formatted = `${formatted[0]}${formatted[1]}:${formatted[2]}`;
        }
        if (input.length > 5) {
            formatted = input.slice(0, 5);
        }
        return formatted;
    };

    const validateTime = useCallback((time: string): boolean => {
        if (!time.includes(":") || time.split(":")[1].length !== 2) return false;

        let [hoursStr, minutesStr] = time.split(":");
        if (hoursStr.length === 1) hoursStr = `0${hoursStr}`;

        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);

        if (minutes > 59) return false;
        if (settings.twentyFour && hours > 23) return false;
        if (!settings.twentyFour && hours > 12) return false;

        return true;
    }, [settings.twentyFour]);

    const checkCorrectGuess = useCallback((time: string): boolean => {
        const [hoursStr, minutesStr] = time.split(":");
        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);

        return (
            randomTime.getHours() === hours &&
            randomTime.getMinutes() === minutes
        );
    }, [randomTime]);

    const onInput = useCallback((e: InputEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.value.trim();
        if (!validateInput(inputValue)) return;

        const formattedValue = formatInput(inputValue);
        setValue(formattedValue);

        if (!formattedValue.includes(":") || formattedValue.split(":")[1].length !== 2) {
            setValidated(null);
            setCorrect(null);
            return;
        }

        const isValidTime = validateTime(formattedValue);
        setValidated(isValidTime);

        if (isValidTime) {
            const isCorrect = checkCorrectGuess(formattedValue);
            setCorrect(isCorrect);
            if (!guesses.current.has(formattedValue)) {
                onScoreChange(score + (isCorrect ? scoreMultiplier : -1));
                guesses.current.add(formattedValue);
            }
            if (isCorrect) {
                setTimeout(() => {
                    setValue("");
                    setCorrect(null);
                    setValidated(null);
                    onRandomTimeChange(new Date(Math.random() * Date.now()))
                }, settings.timings[0] * 1000);
                guesses.current.clear();
                setStartTime(new Date());
            }
        } else {
            setCorrect(false);
        }
    }, [validateTime, checkCorrectGuess, onScoreChange, score, scoreMultiplier, settings.timings, onRandomTimeChange]);

    useEffect(() => {
        // The initial delay is to not make it unfair, starting to count down before the whole time has been shown
        const totalInitialTime = settings.timings.reduce((a, c) => a + c) + settings.initialDelay;
        const interval = setInterval(() => {
            const diffSecs = Math.max(0, Math.min(diffDate(new Date(), startTime) - totalInitialTime, SCORE_FALLOFF_TIME));
            const percent = 1 - diffSecs/SCORE_FALLOFF_TIME;
            const multiplier = INITIAL_SCORE_MULTIPLIER * Math.pow(percent, 2) + MIN_MULTIPLIER * (1 - percent);
            setScoreMultiplier(multiplier);
            setTime(diffSecs);
        }, 100);

        const timeout = setTimeout(() => {
            setScoreMultiplier(MIN_MULTIPLIER);
            setTime(SCORE_FALLOFF_TIME);
            clearInterval(interval);
        }, (totalInitialTime + SCORE_FALLOFF_TIME) * 1000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [settings.initialDelay, settings.timings, startTime]);

    const getInputClassName = () => {
        const baseClass = "bg-darkest rounded-2xl text-primary outline-offset-0 outline-none text-center";
        if (validated === null || validated) {
            if (correct) {
                return `${baseClass} outline-secondary shadow-secondary shadow-[0_0_5rem_rgba(0,0,0,0.25)]`;
            }
            return `${baseClass} outline-dark`;
        }
        return `${baseClass} outline-red`;
    };

    return (
        <div className="min-w-fit">
            <div className="text-3xl mb-2 text-primary z-10 relative">Make your guess</div>
            <div className="relative">
                <input
                    className={getInputClassName()}
                    placeholder="00:00"
                    onInput={onInput}
                    value={value}
                    autoFocus={true}
                    readOnly={correct === true}
                    aria-invalid={validated === false}
                    aria-describedby={validated === false ? "time-error" : undefined}
                />
                <div className="absolute left-full ms-1 grid top-0 bottom-0 text-start text-dark">
                    <div className="text-2xl opacity-50">{scoreMultiplier.toFixed(1)}x</div>
                    <div className="opacity-50">{timer >= SCORE_FALLOFF_TIME ? timer + "+" : timer.toFixed(1)}s</div>
                </div>
            </div>
            {validated === false && (
                <div id="time-error" className="text-[#FF4444] mt-1">
                    Invalid time format
                </div>
            )}
        </div>
    );
};

const diffDate = (date1: Date, date2: Date) => {
    var utcThis = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate(), date1.getHours(), date1.getMinutes(), date1.getSeconds(), date1.getMilliseconds());
    var utcOther = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate(), date2.getHours(), date2.getMinutes(), date2.getSeconds(), date2.getMilliseconds());

    return (utcThis - utcOther) / 1000;
}