import outerRing from "./imageLayers/outerRing.png";
import innerRing from "./imageLayers/innerRing.png";
import ics from "./imageLayers/ics.png";
import sideComponents from "./imageLayers/sideComponents.png";
import base from "./imageLayers/base.png";
import text from "./imageLayers/text.png";
import seperators from "./imageLayers/seperators.png";
import upperNixies from "./imageLayers/upperNixies.png"
import lowerNixies from "./imageLayers/lowerNixies.png"
import upperComponent from "./imageLayers/upperComponent.png"
import upperWires from "./imageLayers/upperWires.png"
import solderPads from "./imageLayers/solderPads.png"
import rightComponentGlass from "./imageLayers/rightComponentGlass.png"
import rightComponentUpper from "./imageLayers/rightComponentUpper.png"
import rightComponentLower from "./imageLayers/rightComponentLower.png"

interface WatchLayer {
    /**
     * The depth should be a number between 0 and 1.
     * 0 means to the absolute bottom, and 1 means to the absolute front.
     */
    depth: number,
    images: string[]
}

// Hardcoded watch layers for now
export const layers: WatchLayer[] = [
    {
        depth: 1,
        images: [outerRing]
    },
    {
        depth: 0.9,
        images: [innerRing]
    },
    {
        depth: 0.7,
        images: [upperComponent, seperators, outerRing]
    },
    {
        depth: 0.6,
        images: [upperNixies, rightComponentGlass, seperators, outerRing]
    },
    {
        depth: 0.5,
        images: [rightComponentUpper, seperators, outerRing]
    },
    {
        depth: 0.4,
        images: [upperWires, seperators, outerRing]
    },
    {
        depth: 0.3,
        images: [lowerNixies, rightComponentLower, seperators, outerRing]
    },
    {
        depth: 0.2,
        images: [sideComponents, seperators, outerRing]
    },
    {
        depth: 0.1,
        images: [ics, upperComponent, seperators, outerRing]
    },
    {
        depth: 0.05,
        images: [text, solderPads, seperators, outerRing]
    },
    {
        depth: 0,
        images: [base, outerRing]
    }
]