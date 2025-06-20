import { CSSProperties, useState } from "react";

type WatchMode = "live"|"guess";
export interface ISettings {
    mode: WatchMode,
    twentyFour: boolean,
    mouseFollow: boolean,
    initialDelay: number,
    randomStart: boolean,
    startPosition: {x: number, y: number, z: number},
    smoothing: number,
    timings: [number, number, number, number, number, number, number]
}

export const Settings = ({settings, onSettingsChange}: {settings: ISettings, onSettingsChange: (value: ISettings) => void}) => {
    const handleChange = (newSettings: Partial<ISettings>) => {
        onSettingsChange({ ...settings, ...newSettings });
    };

    const [mode, setMode] = useState<WatchMode>(settings.mode);

    return (
        <div className="absolute z-10 right-0 top-0">
            <div className="p-2 grid">
                <div className="mb-1 bg-darkest p-3 rounded-2xl">
                    <label className="flex items-center gap-1">
                        <input
                            type="checkbox"
                            checked={settings.mouseFollow}
                            onChange={() => handleChange({mouseFollow: !settings.mouseFollow})}
                            style={checkboxStyle}
                        />
                        <span>Mouse follow</span>
                    </label>

                    <label className="flex items-center gap-1">
                        <input
                            type="checkbox"
                            checked={settings.initialDelay > 0}
                            onChange={() => handleChange({initialDelay: settings.initialDelay > 0 ? 0 : 2})}
                            style={checkboxStyle}
                        />
                        <span>Initial animation</span>
                    </label>

                    <label className="flex items-center gap-1">
                        <input
                            type="checkbox"
                            checked={settings.randomStart}
                            onChange={() => handleChange({randomStart: !settings.randomStart})}
                            style={checkboxStyle}
                        />
                        <span>Random start position</span>
                    </label>

                    <label className="flex items-center gap-1">
                        <input
                            type="checkbox"
                            checked={settings.twentyFour}
                            onChange={() => handleChange({twentyFour: !settings.twentyFour})}
                            style={checkboxStyle}
                        />
                        <span>24 hour clock</span>
                    </label>


                    {/*<label style={settingItemStyle}>*/}
                    {/*    <span style={{whiteSpace: "nowrap"}}>Smoothing Animation</span>*/}
                    {/*    <input*/}
                    {/*        type="number"*/}
                    {/*        max={10}*/}
                    {/*        min={0}*/}
                    {/*        value={settings.smoothing}*/}
                    {/*        onChange={() => handleChange({smoothing: this.value})}*/}
                    {/*    />*/}
                    {/*</label>*/}
                </div>
                <button
                    className="bg-darkest hover:bg-darkest/80 text-primary w-full rounded-2xl"
                    onClick={() => {
                        const mode: WatchMode = settings.mode === "live" ? "guess" : "live";
                        setMode(mode);
                        handleChange({mode: mode});
                    }}
                >{mode === "live" ? "Live Clock" : "Guessing"}</button>
            </div>
        </div>
    );
};

const checkboxStyle: CSSProperties = {
    //appearance: "none",
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