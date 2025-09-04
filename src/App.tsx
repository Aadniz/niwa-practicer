import React from 'react';
import './App.css';
import {Watch} from "./watch/watch";
import {Guess} from "./guess";
import {Settings} from "./settings";
import {LiveTime} from "./live";
import { Score } from './score';
import {useSettingsStore} from "./store";

function App() {

    const mode = useSettingsStore((state) => state.mode);

    return (
        <div className="App bg-darker text-foreground">
            <Settings/>
            {mode === "guess" ? <Score/> : <></>}
            <Watch/>
            { mode === "guess"
                ? <Guess/>
                : <LiveTime/> }
        </div>
    );
}

export default App;
