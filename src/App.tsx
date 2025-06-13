import React, {useState} from 'react';
import './App.css';
import {Watch} from "./watch/watch";
import {Guess} from "./guess";
import {Settings} from "./settings";
import {LiveTime} from "./live";

function App() {

    // In your Watch component:
    const [settings, setSettings] = useState({
        mode: "live",
        twentyFour: true,
        mouseFollow: true,
        initialDelay: true,
        randomStart: true,
        smoothing: 2
    });

  return (
    <div className="App">
        <Settings
            onModeChange={(mode) => setSettings(prev => ({...prev, mode}))}
            onMouseFollowChange={(enabled) => setSettings(prev => ({...prev, mouseFollow: enabled}))}
            onInitialDelayChange={(enabled) => setSettings(prev => ({...prev, initialDelay: enabled}))}
            onRandomStartChange={(enabled) => setSettings(prev => ({...prev, randomStart: enabled}))}
            onSmoothingChange={(value) => setSettings(prev => ({...prev, smoothing: value}))}
        />
        <Watch/>
        { settings.mode === "guessing" ? <Guess/> : <LiveTime twentyFour={settings.twentyFour}/> }
    </div>
  );
}

export default App;
