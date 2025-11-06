import { useEffect, useRef, useState } from "react";

const DESKTOP_MIN_WIDTH = 1024;

const getInitialLayoutState = () => {
    if (typeof window === "undefined") {
        return true;
    }

    return window.innerWidth >= DESKTOP_MIN_WIDTH;
};

/**
 * Keeps the desktop dashboard visible only while the window stays at the initial
 * (maximized) width. The moment the user starts shrinking the window, the layout
 * switches to the mobile variant. We still fall back to the mobile layout for
 * genuinely small screens (< DESKTOP_MIN_WIDTH) so phones and tablets behave as expected.
 */
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

            if (width < DESKTOP_MIN_WIDTH) {
                setIsDesktopLayout(false);
                return;
            }

            setIsDesktopLayout(width >= baseline);
        };

        window.addEventListener("resize", updateLayout);
        updateLayout();

        return () => {
            window.removeEventListener("resize", updateLayout);
        };
    }, []);

    return isDesktopLayout;
}
