import {CSSProperties} from "react";

export const Guess = () => {
    return (
        <div style={wrapperStyle}>
            <div>Make your guess</div>
            <input/>
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