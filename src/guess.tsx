import {CSSProperties} from "react";

export const Guess = () => {
    return (
        <div style={wrapperStyle}>
            <div>Make your guess</div>
            <input style={style}/>
        </div>
    )
}

const wrapperStyle: CSSProperties = {
    textAlign: "center",
    display: "block",
    minWidth: "30vh",
    marginLeft: "auto",
    marginRight: "auto"
}

const style: CSSProperties = {
    padding: "1rem",
    backgroundColor: "var(--darkest)",
    border: "none",
    outline: "none",
    color: "var(--primary)",
    width: "100%"
}