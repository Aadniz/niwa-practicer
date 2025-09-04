import { useRef, useEffect, useState } from "react";
import {useScoreStore} from "./store";

export const Score = () => {

    const score = useScoreStore((state) => state.value);

    const lastScore = useRef(score);
    const [scoreColor, setScoreColor] = useState("text-dark");
    const [delta, setDelta] = useState<{ value: number; visible: boolean }>({ value: 0, visible: false });

    useEffect(() => {
        if (score === lastScore.current) return;

        const diff = score - lastScore.current;
        setDelta({ value: diff, visible: true });
        setScoreColor(diff > 0 ? "text-secondary" : "text-danger");

        const timer = setTimeout(() => {
            setScoreColor("text-dark transition-colors duration-1000");
            setDelta(prev => ({ ...prev, visible: false }));
        }, 1000);

        lastScore.current = score;
        return () => clearTimeout(timer);
    }, [score]);

    const [randomX, randomY] = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]

    return (
        <div className="absolute z-10 left-0 top-0 m-2 bg-darkest p-3 rounded-2xl">
            <div className="text-2xl">Score</div>
            <div className="relative">
                <div className={scoreColor}>{score.toFixed(2)}</div>
                {delta.visible && (
                    <div className={`
                        absolute left-full ml-2 text-sm
                        ${delta.value > 0 ? "text-secondary" : "text-danger"}
                        animate-[fadeOut_1s_ease-out_forwards]
                    `} style={{transform: `translateX(${randomX}px) translateY(${randomY}px)`}}>
                        {delta.value > 0 ? "+" : ""}{delta.value.toFixed(2)}
                    </div>
                )}
            </div>
        </div>
    );
};