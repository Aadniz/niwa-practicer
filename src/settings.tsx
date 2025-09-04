import { CSSProperties } from "react";
import {useSettingsStore} from "./store";

export const Settings = () => {

    const settings = useSettingsStore((state) => state);

    return (
        <div className="absolute z-10 right-0 top-0">
            <div className="p-2 grid">
                <div className="mb-1 bg-darkest p-3 rounded-2xl">
                    <label className="flex items-center gap-1">
                        <input
                            type="checkbox"
                            checked={settings.mouseFollow}
                            onChange={() => settings.toggle("mouseFollow")}
                            style={checkboxStyle}
                        />
                        <span>Mouse follow</span>
                    </label>

                    <label className="flex items-center gap-1">
                        <input
                            type="checkbox"
                            checked={settings.initialDelay > 0}
                            onChange={() => settings.setInitialDelay(settings.initialDelay > 0 ? 0 : 2)}
                            style={checkboxStyle}
                        />
                        <span>Initial animation</span>
                    </label>

                    <label className="flex items-center gap-1">
                        <input
                            type="checkbox"
                            checked={settings.randomStart}
                            onChange={() => settings.toggle("randomStart")}
                            style={checkboxStyle}
                        />
                        <span>Random start position</span>
                    </label>

                    <label className="flex items-center gap-1">
                        <input
                            type="checkbox"
                            checked={settings.twentyFour}
                            onChange={() => settings.toggle("twentyFour")}
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
                    onClick={() => settings.toggleMode()}
                >{settings.mode === "live" ? "Live Clock" : "Guessing"}</button>
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