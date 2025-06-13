import outerRing from "./imageLayers/outerRing.png";
import innerRing from "./imageLayers/innerRing.png";
import ics from "./imageLayers/ics.png";
import sideComponents from "./imageLayers/sideComponents.png";
import sideComponentsGlass from "./imageLayers/sideComponentsGlass.png";
import base from "./imageLayers/base.png";
import text from "./imageLayers/text.png";
import seperators from "./imageLayers/seperators.png";
import upperNixies from "./imageLayers/nixies/upperNixies.png"
import lowerNixies from "./imageLayers/nixies/lowerNixies.png"
import upperComponent from "./imageLayers/upperComponent.png"
import upperWires from "./imageLayers/upperWires.png"
import solderPads from "./imageLayers/solderPads.png"
import rightComponentGlass from "./imageLayers/rightComponentGlass.png"
import rightComponentUpperOff from "./imageLayers/rightComponentUpperOff.png"
import rightComponentUpperOn from "./imageLayers/rightComponentUpperOn.png"
import rightComponentLower from "./imageLayers/rightComponentLower.png"

import nixie00 from "./imageLayers/nixies/00.png";
import nixie01 from "./imageLayers/nixies/01.png";
import nixie02 from "./imageLayers/nixies/02.png";
import nixie03 from "./imageLayers/nixies/03.png";
import nixie04 from "./imageLayers/nixies/04.png";
import nixie05 from "./imageLayers/nixies/05.png";
import nixie06 from "./imageLayers/nixies/06.png";
import nixie07 from "./imageLayers/nixies/07.png";
import nixie08 from "./imageLayers/nixies/08.png";
import nixie09 from "./imageLayers/nixies/09.png";
import nixie10 from "./imageLayers/nixies/10.png";
import nixie11 from "./imageLayers/nixies/11.png";
import nixie12 from "./imageLayers/nixies/12.png";
import nixie13 from "./imageLayers/nixies/13.png";
import nixie14 from "./imageLayers/nixies/14.png";
import nixie15 from "./imageLayers/nixies/15.png";

interface WatchLayer {
    /**
     * ID is only used for all the nixie tubes, and the last id is used for the green light.
     * The ids span from 0 - 16
     */
    id?: number,
    /**
     * The depth should be a number between 0 and 1.
     * 0 means to the absolute bottom, and 1 means to the absolute front.
     */
    depth: number,
    images: string[],
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
        id: 16,
        depth: 0.5,
        images: [rightComponentUpperOff, rightComponentUpperOn]
    },
    {
        depth: 0.5,
        images: [seperators, outerRing]
    },
    {
        depth: 0.4,
        images: [upperWires, seperators, outerRing]
    },
    {
        id: 0,
        depth: 0.35,
        images: [nixie00]
    },
    {
        id: 1,
        depth: 0.65,
        images: [nixie01]
    },
    {
        id: 2,
        depth: 0.35,
        images: [nixie02]
    },
    {
        id: 3,
        depth: 0.65,
        images: [nixie03]
    },
    {
        id: 4,
        depth: 0.35,
        images: [nixie04]
    },
    {
        id: 5,
        depth: 0.65,
        images: [nixie05]
    },
    {
        id: 6,
        depth: 0.65,
        images: [nixie06]
    },
    {
        id: 7,
        depth: 0.35,
        images: [nixie07]
    },
    {
        id: 8,
        depth: 0.65,
        images: [nixie08]
    },
    {
        id: 9,
        depth: 0.35,
        images: [nixie09]
    },
    {
        id: 10,
        depth: 0.65,
        images: [nixie10]
    },
    {
        id: 11,
        depth: 0.35,
        images: [nixie11]
    },
    {
        id: 12,
        depth: 0.65,
        images: [nixie12]
    },
    {
        id: 13,
        depth: 0.35,
        images: [nixie13]
    },
    {
        id: 14,
        depth: 0.65,
        images: [nixie14]
    },
    {
        id: 15,
        depth: 0.35,
        images: [nixie15]
    },

    {
        depth: 0.3,
        images: [lowerNixies, rightComponentLower, seperators, outerRing]
    },
    {
        depth: 0.25,
        images: [sideComponentsGlass, seperators, outerRing]
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