import {ISettings} from "./settings";
import {InputEvent, useState} from "react";

export const Guess = ({settings}: {settings: ISettings}) => {

    const [value, setValue] = useState("");
    const [validated, setValidate] = useState<boolean|null>(null);
    const [correct, setCorrect] = useState<boolean|null>(null);

    const onInput = (e: InputEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value.trim();

        // Validate it contains legal characters
        if (value[0] === ":") {
            return;
        }
        if (value.split(":").length > 2){
            return;
        }
        if (value.trim() !== "" && !/^([0-9:]+)$/.test(value)) {
            return;
        }
        if (value[value.length - 1] === ":") {
            value = value.substring(0, value.length - 1);
        }
        if (/^\d{3}/.test(value)) {
            value = value[0] + value[1] + ":" + value[2];
        }
        if (value.includes(":") && value.split(":")[1].length > 2) {
            return;
        }
        // Here we have finished typing the number, valudate if it is a clock or not
        if (value.includes(":") && value.split(":")[1].length === 2) {
            let checkValue = value;
            if (value.split(":")[0].length === 1) {
                checkValue = "0" + checkValue;
            }
            const [hours, minutes] = checkValue.split(":").map(v => parseInt(v[0] + v[1]));

            if (settings.twentyFour && hours > 23) {
                setCorrect(false);
                setValidate(false);
            } else if (!settings.twentyFour && hours > 12) {
                setCorrect(false);
                setValidate(false);
            } else if (minutes > 59) {
                setCorrect(false);
                setValidate(false);
            } else {
                if (settings.randomTime.getHours() === parseInt(value.split(":")[0]) && settings.randomTime.getMinutes() === parseInt(value.split(":")[1])) {
                    setCorrect(true);
                } else {
                    setCorrect(false);
                }
                setValidate(true);
            }
        } else {
            setCorrect(null);
            setValidate(null);
        }
        setValue(value);
    };

    return (
        <div className="min-w-fit">
            <div className="text-3xl mb-2 text-primary">Make your guess</div>
            <input
                className={"bg-darkest rounded-2xl text-primary outline-none text-center " + (correct ? "disabled" : "") + (validated === null || validated ? "focus:outline-secondary" : "outline-red")}
                placeholder="00:00"
                onInput={onInput}
                value={value}
            />
            <i>{correct !== null ? (correct ? "THAT IS CORRECT" : "THAT IS INCORRECT" ) : ""}</i>
        </div>
    )
}