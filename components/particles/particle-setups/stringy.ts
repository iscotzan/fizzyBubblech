import {IOptions, RecursivePartial} from "tsparticles";

export const stringy: RecursivePartial<IOptions> = {
    background: {
        // color: {
        //     value: "#0d47a1",
        // },
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            // onDiv: {
            //     selectors: ".repulse-div",
            //     enable: false,
            //     mode: "repulse"
            // },
            onClick: {
                enable: true,
                mode: "repulse"//"connect",//push
            },
            onHover: {
                enable: true,
                mode: "connect"//"repulse",
            },

            resize: true,
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 5,
                opacity: 0.8,
                size: 40,
            },
            connect: {
                distance: 200,
                radius: 200

            },
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 200,
                duration: 0.8,
            },
        },
    },
    particles: {
        color: {
            value: "#ffffff",
        },
        links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
        },
        collisions: {
            enable: true,
        },
        move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 4,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 1200,
            },
            value: 80,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: "circle",
        },
        size: {
            random: true,
            value: 5,
        },
    },
    detectRetina: true,
}