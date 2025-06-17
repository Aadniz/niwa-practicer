import { ISettings } from "./settings";
import { InputEvent, useState, useCallback } from "react";

interface GuessProps {
    settings: ISettings;
    score: number;
    onScoreChange: (value: number) => void;
    randomTime: Date;
    onRandomTimeChange: (value: Date) => void;
}

export const Guess = ({ settings, score, onScoreChange, randomTime, onRandomTimeChange }: GuessProps) => {
    const [value, setValue] = useState("");
    const [validated, setValidated] = useState<boolean | null>(null);
    const [correct, setCorrect] = useState<boolean | null>(null);

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
            onScoreChange(score + (isCorrect ? 10 : -1));
            if (isCorrect) {
                setTimeout(() => {
                    setValue("");
                    setCorrect(null);
                    setValidated(null);
                    onRandomTimeChange(new Date(Math.random() * Date.now()))
                }, settings.timings[0] * 1000)
            }
        } else {
            setCorrect(false);
        }
    }, [validateTime, checkCorrectGuess, onScoreChange, score, settings.timings, onRandomTimeChange]);

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
            <input
                className={getInputClassName()}
                placeholder="00:00"
                onInput={onInput}
                value={value}
                readOnly={correct === true}
                aria-invalid={validated === false}
                aria-describedby={validated === false ? "time-error" : undefined}
            />
            {validated === false && (
                <div id="time-error" className="text-[#FF4444] mt-1">
                    Invalid time format
                </div>
            )}
        </div>
    );
};