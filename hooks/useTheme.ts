import {useLayoutEffect} from "react";
import "./styles.scss"; // -> https://codesandbox.io/s/15mko9187

interface Theme {
    [name: string]: string;
}

// Hook
function useTheme(theme: Theme): void {
    useLayoutEffect(
        (): void => {
            // Iterate through each value in theme object
            for (const key in theme) {
                // Update css variables in document's root element
                document.documentElement.style.setProperty(`--${key}`, theme[key]);
            }
        },
        [theme] // Only call again if theme object reference changes
    );
}


// Usage
// const theme = {
//     "button-padding": "16px",
//     "button-font-size": "14px",
//     "button-border-radius": "4px",
//     "button-border": "none",
//     "button-color": "#FFF",
//     "button-background": "#6772e5",
//     "button-hover-border": "none",
//     "button-hover-color": "#FFF",
// };

// This is type of "theme" object, kind of dynamic type

//
// const something = () => {
//     useTheme(theme);
//     return (
//         <div>
//             <button className="button" > Button < /button>
//             < /div>
//     );
// }