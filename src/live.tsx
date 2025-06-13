import {CSSProperties, useEffect, useState} from "react";

export const LiveTime = ({twentyFour}: {twentyFour: boolean}) => {

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
    if (twentyFour) {
        timeString += hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
    } else {
        if (hours === 0) {
            timeString += `12`;
        } else {
            timeString += hours.toString().padStart(2, "0");
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
            <div style={timeStyle}>{timeString}</div>
            <div style={dateStyle}>{date.toDateString()}</div>
        </div>
    )
}

const timeStyle: CSSProperties = {
    color: "var(--primary)"
}

const dateStyle: CSSProperties = {
    color: "var(--dark)",
    fontSize: "calc(8px + 1vmin)"
}