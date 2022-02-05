// Hook
import {useEffect, useState} from "react";

// Hook
const useMedia = <T>(queries: string[], values: T[], defaultValue: T) => {
    // Array containing a media query list for each query
    let mediaQueryLists = null

    const [value, setValue] = useState<T>(null);

    // Function that gets value based on matching media query
    const getValue = () => {
        // Get index of first media query that matches
        const index = mediaQueryLists.findIndex((mql) => mql.matches);
        // Return related value or defaultValue if none
        return values?.[index] || defaultValue;
    };
    // State and setter for matched value
    useEffect(
        () => {
            mediaQueryLists = queries.map((q) => window.matchMedia(q));
            setValue(getValue)
            // Event listfener callback
            // Note: By defining getValue outside of useEffect we ensure that it has ...
            // ... current values of hook args (as this hook callback is created once on mount).
            const handler = () => setValue(getValue);
            // Set a listener for each media query with above handler as callback.
            mediaQueryLists.forEach((mql) => mql.addEventListener('mql', handler));
            // Remove listeners on cleanup
            return () =>
                mediaQueryLists.forEach((mql) => mql.removeEventListener('mql', handler));
        },
        [] // Empty array ensures effect is only run on mount and unmount
    );
    return value;
};
export default useMedia;