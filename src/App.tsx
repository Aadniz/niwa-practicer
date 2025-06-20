import React, {useState} from 'react';
import './App.css';
import {Watch} from "./watch/watch";
import {Guess} from "./guess";
import {ISettings, Settings} from "./settings";
import {LiveTime} from "./live";
import { Score } from './score';

function App() {

    // Initial settings
    const [settings, setSettings] = useState<ISettings>({
        mode: "guess",
        twentyFour: true,
        mouseFollow: false,
        initialDelay: 2,
        randomStart: true,
        startPosition: {x: 0, y: 20, z: 0},
        smoothing: 2,
        // Initial off delay, Hours, off, minutes, off, seconds, off, seconds, off, seconds etc etc
        timings: [1.5, 1.0, 0.4, 1.3, 0.8, 0.6, 0.4]
    });

    const [score, setScore] = useState(0.00);
    const [randomTime, setRandomTime] = useState<Date>(new Date(Math.random() * Date.now()));

    return (
        <div className="App bg-darker text-foreground">
            <Settings settings={settings} onSettingsChange={setSettings}/>
            {settings.mode === "guess" ? <Score score={score}/> : <></>}
            <Watch settings={settings} time={randomTime} score={score}/>
            { settings.mode === "guess"
                ? <Guess settings={settings} score={score} onScoreChange={setScore} randomTime={randomTime} onRandomTimeChange={setRandomTime}/>
                : <LiveTime settings={settings}/> }
        </div>
    );
}

export default App;
