import { useEffect, useRef, useState } from "react";

const DESKTOP_MIN_WIDTH = 1024;
const DESKTOP_SWAP_DELTA = 20;

const getInitialLayoutState = () => {
    if (typeof window === "undefined") {
        return true;
    }

    return window.innerWidth >= DESKTOP_MIN_WIDTH;
};


export default function useDashboardLayout() {
    const [isDesktopLayout, setIsDesktopLayout] = useState(getInitialLayoutState);
    const initialWidthRef = useRef<number | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        initialWidthRef.current = window.innerWidth;

        const updateLayout = () => {
            const width = window.innerWidth;
            const baseline = initialWidthRef.current ?? width;

            if (baseline < DESKTOP_MIN_WIDTH) {
                setIsDesktopLayout(width >= DESKTOP_MIN_WIDTH);
                return;
            }

            const shrinkThreshold = Math.max(DESKTOP_MIN_WIDTH, baseline - DESKTOP_SWAP_DELTA);

            if (width < shrinkThreshold) {
                setIsDesktopLayout(false);
                return;
            }

            setIsDesktopLayout(true);
        };

        window.addEventListener("resize", updateLayout);
        updateLayout();

        return () => {
            window.removeEventListener("resize", updateLayout);
        };
    }, []);

    return isDesktopLayout;
}
