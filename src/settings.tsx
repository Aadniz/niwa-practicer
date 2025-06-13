import { CSSProperties, useState } from "react";

type SettingsProps = {
    onModeChange: (mode: "guessing" | "live") => void;
    onMouseFollowChange: (enabled: boolean) => void;
    onInitialDelayChange: (enabled: boolean) => void;
    onRandomStartChange: (enabled: boolean) => void;
    onSmoothingChange: (value: number) => void;
};

export const Settings = ({
                             onModeChange,
                             onMouseFollowChange,
                             onInitialDelayChange,
                             onRandomStartChange,
                             onSmoothingChange,
                         }: SettingsProps) => {
    const [mode, setMode] = useState<"guessing" | "live">("live");
    const [mouseFollow, setMouseFollow] = useState(true);
    const [initialDelay, setInitialDelay] = useState(true);
    const [randomStart, setRandomStart] = useState(true);
    const [smoothness, setSmoothness] = useState(2);

    const handleModeChange = () => {
        const newMode = mode === "guessing" ? "live" : "guessing";
        setMode(newMode);
        onModeChange(newMode);
    };

    const handleSmoothingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setSmoothness(value);
        onSmoothingChange(value);
    }

    const handleMouseFollowChange = () => {
        const newValue = !mouseFollow;
        setMouseFollow(newValue);
        onMouseFollowChange(newValue);
    };

    const handleInitialDelayChange = () => {
        const newValue = !initialDelay;
        setInitialDelay(newValue);
        onInitialDelayChange(newValue);
    };

    const handleRandomStartChange = () => {
        const newValue = !randomStart;
        setRandomStart(newValue);
        onRandomStartChange(newValue);
    };

    return (
        <div style={containerStyle}>
            <div style={wrapperStyle}>
                <div style={settingGroupStyle}>
                    <label style={settingItemStyle}>
                        <input
                            type="checkbox"
                            checked={mouseFollow}
                            onChange={handleMouseFollowChange}
                            style={checkboxStyle}
                        />
                        <span>Mouse follow</span>
                    </label>

                    <label style={settingItemStyle}>
                        <input
                            type="checkbox"
                            checked={initialDelay}
                            onChange={handleInitialDelayChange}
                            style={checkboxStyle}
                        />
                        <span>Initial animation</span>
                    </label>

                    <label style={settingItemStyle}>
                        <input
                            type="checkbox"
                            checked={randomStart}
                            onChange={handleRandomStartChange}
                            style={checkboxStyle}
                        />
                        <span>Random start position</span>
                    </label>


                    <label style={settingItemStyle}>
                        <span style={{whiteSpace: "nowrap"}}>Smoothing Animation</span>
                        <input
                            type="number"
                            max={10}
                            min={0}
                            value={smoothness}
                            onChange={handleSmoothingChange}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};

// Styles
const containerStyle: CSSProperties = {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1000
};

const wrapperStyle: CSSProperties = {
    padding: "0.5rem",
    display: "flex",
    justifyContent: "flex-end"
};

const settingGroupStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    backgroundColor: "var(--darkest)",
    padding: "1rem",
    borderRadius: "8px",
    backdropFilter: "blur(4px)"
};

const settingItemStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "var(--foreground)",
    cursor: "pointer",
    fontSize: "0.9rem"
};

const checkboxStyle: CSSProperties = {
    appearance: "none",
    width: "16px",
    height: "16px",
    border: "2px solid var(--dark)",
    borderRadius: "4px",
    backgroundColor: "transparent",
    cursor: "pointer",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};