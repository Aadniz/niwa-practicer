import React, {useState} from 'react';
import './App.css';
import {Watch} from "./watch/watch";
import {Guess} from "./guess";
import {ISettings, Settings} from "./settings";
import {LiveTime} from "./live";

function App() {

    // Initial settings
    const [settings, setSettings] = useState<ISettings>({
        mode: "live",
        twentyFour: true,
        mouseFollow: true,
        initialDelay: true,
        randomStart: true,
        smoothing: 2,
        randomTime: new Date(Math.random() * Date.now())
    });

  return (
    <div className="App bg-darker text-foreground">
        <Settings settings={settings} onSettingsChange={setSettings}/>
        <Watch settings={settings}/>
        { settings.mode === "guess"
            ? <Guess settings={settings}/>
            : <LiveTime settings={settings}/> }
    </div>
  );
}

export default App;
