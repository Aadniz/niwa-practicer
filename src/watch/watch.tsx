import { CSSProperties, useEffect, useRef, useState, useCallback } from "react";
import { layers } from "./layers";
import {useRandomTimeStore, useScoreStore, useSettingsStore} from "../store";


// Constants
const MAX_ROTATION = 60;
const DEFAULT_PARALLAX_FACTOR = 1.5;
const MOUSE_SENSITIVITY = 90; // Lower = less sensitive
const SCROLL_SENSITIVITY = 300;
const Z_DEPTH_MULTIPLIER = 20;
const TRANSITION_DURATION = 2;
const SHOW_CLOCK_CYCLE_SECONDS = 29;

export const Watch = () => {

    const score = useScoreStore(state => state.value);
    const settings = useSettingsStore((state) => state);
    const time = useRandomTimeStore((state) => state.value);

    const initialScore = useRef(score);
    const inInitialAnimation = useRef(false);
    const watchTime = settings.mode === "live" || time === undefined ? new Date() : time;
    const hours = watchTime.getHours();
    const minutes = watchTime.getMinutes();
    const [rotation, setRotation] = useState(settings.randomStart
        ? randomRotation()
        : showRotation());

    if (settings.initialDelay > 0 && initialScore.current !== score) {
        if (score > initialScore.current) {
            setRotation(settings.randomStart ? randomRotation() : fixedRotation());
            inInitialAnimation.current = true;
            setTimeout(() => {
                setRotation(showRotation());
                inInitialAnimation.current = false;
            }, settings.initialDelay * 1000);
        }
        initialScore.current = score;
    }

    const [[leftNum, rightNum, greenLight], setNums] = useState([-1, -1, false]);

    useEffect(() => {
        let timeouts: NodeJS.Timeout[] = [];
        let accumulatedTime = settings.initialDelay;

        const [leftHours, rightHours] = hours.toString().padStart(2, "0").split("").map(h => parseInt(h));
        const [leftMinutes, rightMinutes] = minutes.toString().padStart(2, "0").split("").map(h => parseInt(h));

        // Sequence: initial delay, show hours, hide, show minutes, hide, etc.
        for (let i = 0; i < SHOW_CLOCK_CYCLE_SECONDS * 2; i++) {
            if (settings.timings.length > i) {
                accumulatedTime += settings.timings[i];
            } else {  // The seconds
                const percentCycled = i / (SHOW_CLOCK_CYCLE_SECONDS * 2);
                if (i % 2 === 0) {
                    const initialTiming = settings.timings[settings.timings.length - 1];
                    accumulatedTime += initialTiming + percentCycled * (1 - initialTiming);
                } else {
                    const initialTiming = settings.timings[settings.timings.length - 2];
                    accumulatedTime += initialTiming * (1 - percentCycled);
                }
            }
            const timeout = setTimeout(() => {
                if (i >= SHOW_CLOCK_CYCLE_SECONDS * 2 - 1) {
                    setNums([-1, -1, false]);
                } else if (i % 2 === 0) {
                    if (i === 0) {
                        setNums([leftHours, rightHours, true]);
                    } else if (i === 2) {
                        setNums([leftMinutes, rightMinutes, true]);
                    } else if (settings.mode === "live") {  // Show seconds
                        const [leftSeconds, rightSeconds] = (new Date()).getSeconds().toString().padStart(2, "0").split("").map(s => parseInt(s));
                        setNums([leftSeconds, rightSeconds, true]);
                    }
                } else {
                    setNums([-1, -1, true]);
                }
            }, accumulatedTime * 1000);

            timeouts.push(timeout);
        }

        return () => {
            timeouts.forEach(timeout => clearTimeout(timeout));
        };
    }, [hours, minutes, settings.initialDelay, settings.mode, settings.timings]);


    const [parallaxFactor, setParallaxFactor] = useState(DEFAULT_PARALLAX_FACTOR);
    const animationFrameRef = useRef<number>(0);
    const lastMousePosition = useRef({ x: 0, y: 0 });

    // Smoothly handle mouse movement with requestAnimationFrame
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!settings.mouseFollow || inInitialAnimation.current)
            return;
        lastMousePosition.current = {
            x: -(e.clientY / window.innerHeight - 0.5) * MOUSE_SENSITIVITY,
            y: (e.clientX / window.innerWidth - 0.5) * MOUSE_SENSITIVITY
        };

        if (!animationFrameRef.current) {
            animationFrameRef.current = requestAnimationFrame(() => {
                setRotation(prev => ({
                    x: lastMousePosition.current.x,
                    y: lastMousePosition.current.y,
                    z: 0
                }));
                animationFrameRef.current = 0;
            });
        }
    }, [settings.mouseFollow]);

    const handleWheel = useCallback((e: WheelEvent) => {
        e.preventDefault();
        setParallaxFactor(prev => {
            const newValue = prev - e.deltaY / SCROLL_SENSITIVITY;
            return Math.max(0.0, Math.min(10.0, newValue));
        });
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setRotation(showRotation());

            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("wheel", handleWheel, { passive: false });
        }, settings.initialDelay > 0 ? settings.initialDelay * 1000 : 10);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("wheel", handleWheel);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [handleMouseMove, handleWheel, settings.initialDelay]);

    return (
        <div style={wrapperStyle}>
            <div style={innerBorderStyle}>
                {layers.map(l => l.images.map((i, idx) => {
                    const zIndex = Math.floor(l.depth * 100);
                    const radX = rotation.x * Math.PI / 180;
                    const radY = rotation.y * Math.PI / 180;
                    const translateX = Math.sin(radY) * l.depth * parallaxFactor * 100;
                    const translateY = -Math.sin(radX) * l.depth * parallaxFactor * 100;

                    let opacity = "1";
                    if (l.id !== undefined) {
                        // Green light
                        if (l.id === 16) {
                            if (!greenLight && idx === 1) {
                                opacity = "0";
                            } else if (greenLight && idx === 0) {
                                opacity = "0";
                            }
                        }
                        // Left lights
                        else if (5 >= l.id) {
                            if (leftNum !== l.id) {
                                opacity = "0";
                            }
                        }
                        // Right lights
                        else {
                            if (rightNum !== l.id - 6) {
                                opacity = "0";
                            }
                        }
                    }

                    let style: CSSProperties = {
                        ...layerStyle,
                        zIndex,
                        backgroundImage: `url('${i}')`,
                        transform: `
                            rotateX(${rotation.x}deg)
                            rotateY(${rotation.y}deg)
                            translateX(${translateX}px)
                            translateY(${translateY}px)
                            translateZ(${l.depth * Z_DEPTH_MULTIPLIER}px)
                        `,
                        transition: `transform ${TRANSITION_DURATION}s ease-out`,
                        opacity: opacity
                    };

                    return (
                        <div
                            key={`${l.depth}-${idx}`}
                            style={style}
                            aria-hidden="true"
                        />
                    );
                }))}
            </div>
        </div>
    );
};

const fixedRotation = () => {
    return {
        x: 30,
        y: 0,
        z: 0
    }
}

const randomRotation = () => {
    return {
        x: Math.random() * MAX_ROTATION - MAX_ROTATION/2,
        y: Math.random() * MAX_ROTATION - MAX_ROTATION/2,
        z: 0,
    }
}

const showRotation = () => {
    return {
        x: 10,
        y: 0,
        z: 0
    }
}

// Styles
const wrapperStyle: CSSProperties = {
    height: "70vh",
    width: "100%"
    
};

const innerBorderStyle: CSSProperties = {
    margin: "2rem",
    height: "calc(100% - 2rem * 2)",
    position: "relative",
    perspective: "2000px",
    backfaceVisibility: "hidden",
    transformStyle: "preserve-3d",
};

const layerStyle: CSSProperties = {
    position: "absolute",
    height: "100%",
    aspectRatio: "1/1",
    margin: "auto",
    left: 0,
    right: 0,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    willChange: "transform",
    backfaceVisibility: "hidden",
};