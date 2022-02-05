import {IOptions, RecursivePartial} from "tsparticles";

export const snowy: RecursivePartial<IOptions> = {
    background: {
        opacity: 0,
        color: {
            value: "#0d47a1"
        },
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover"
    },
    fullScreen: {
        zIndex: 1
    },
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "repulse"
            },
            onHover: {
                enable: true,
                mode: "bubble"
            }
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 0.3,
                opacity: 1,
                size: 4
            },
            grab: {
                distance: 400,
                links: {
                    opacity: 0.5
                }
            }
        }
    },
    particles: {
        links: {
            color: {
                value: "#ffffff"
            },
            distance: 500,
            opacity: 0.4,
            width: 2
        },
        move: {
            attract: {
                rotate: {
                    x: 600,
                    y: 1200
                }
            },
            direction: "bottom",
            enable: true,
            outModes: {
                bottom: "out",
                left: "out",
                right: "out",
                top: "out",
                default: "out"
            }
        },
        number: {
            density: {
                enable: true
            },
            value: 36
        },
        opacity: {
            random: {
                minimumValue: 0.5,
                enable: true
            },
            value: {
                min: 0.1,
                max: 0.5
            },
            animation: {
                speed: 1,
                minimumValue: 0.1
            }
        },
        color: {value: '#d9f'},
        size: {
            random: {
                minimumValue: 0.1,
                enable: true
            },
            value: {
                min: 1,
                max: 10
            },
            animation: {
                speed: 40,
                minimumValue: 0.1
            }
        }
    }
}