import { CSSProperties, useEffect, useRef, useState, useCallback } from "react";
import { layers } from "./layers";

// Constants
const MAX_ROTATION = 60;
const DEFAULT_PARALLAX_FACTOR = 0.5;
const INITIAL_ANIMATION_DELAY = 2000;
const MOUSE_SENSITIVITY = 90; // Lower = less sensitive
const SCROLL_SENSITIVITY = 300;
const Z_DEPTH_MULTIPLIER = 20;
const TRANSITION_DURATION = "2s";

export const Watch = () => {
    const [rotation, setRotation] = useState({
        x: Math.random() * MAX_ROTATION,
        y: Math.random() * MAX_ROTATION,
        z: 0,
    });
    const [parallaxFactor, setParallaxFactor] = useState(DEFAULT_PARALLAX_FACTOR);
    const animationFrameRef = useRef<number>(0);
    const lastMousePosition = useRef({ x: 0, y: 0 });

    // Smoothly handle mouse movement with requestAnimationFrame
    const handleMouseMove = useCallback((e: MouseEvent) => {
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
    }, []);

    const handleWheel = useCallback((e: WheelEvent) => {
        e.preventDefault();
        setParallaxFactor(prev => {
            const newValue = prev - e.deltaY / SCROLL_SENSITIVITY;
            return Math.max(0.0, Math.min(10.0, newValue));
        });
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setRotation({ x: 10, y: 0, z: 0 });

            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("wheel", handleWheel, { passive: false });
        }, INITIAL_ANIMATION_DELAY);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("wheel", handleWheel);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [handleMouseMove, handleWheel]);

    return (
        <div style={wrapperStyle}>
            <div style={innerBorderStyle}>
                {layers.map(l => l.images.map((i, idx) => {
                    const zIndex = Math.floor(l.depth * 100);
                    const radX = rotation.x * Math.PI / 180;
                    const radY = rotation.y * Math.PI / 180;
                    const translateX = Math.sin(radY) * l.depth * parallaxFactor * 100;
                    const translateY = -Math.sin(radX) * l.depth * parallaxFactor * 100;

                    const style: CSSProperties = {
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
                        transition: `transform ${TRANSITION_DURATION} ease-out`,
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