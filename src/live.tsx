import {useEffect, useState} from "react";
import {useSettingsStore} from "./store";

export const LiveTime = () => {

    const settings = useSettingsStore((state) => state);

    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    let timeString = "";
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    if (settings.twentyFour) {
        timeString += hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
    } else {
        if (hours === 0) {
            timeString += `12`;
        } else if (hours > 12) {
            timeString += (hours - 12).toString()
        } else {
            timeString += hours.toString()
        }
        timeString += ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
        if (12 > hours) {
            timeString += " AM";
        } else {
            timeString += " PM";
        }
    }

    return (
        <div style={{display: "grid"}}>
            <div className="text-primary text-3xl">{timeString}</div>
            <div className="text-dark">{date.toDateString()}</div>
        </div>
    )
}