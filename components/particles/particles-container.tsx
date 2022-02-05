import React from "react";
import Particles from "react-tsparticles";
import {Container, Engine} from "tsparticles";
import {stringy} from "./particle-setups/stringy";
import {snowy} from "./particle-setups/snowy";
import {bubbly} from "./particle-setups/bubbly";

function ParticlesContainer({children}) {
    const particlesInit = async (engine: Engine) => {
        console.log(engine);
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets

    };

    const particlesLoaded = async (container: Container) => {
        console.log(container);
    };

    return (
        <div style={{position: 'relative'}}>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={bubbly}
            />
            {/*style={{*/}
            {/*    position: 'absolute',*/}
            {/*    zIndex: 1,*/}
            {/*    left: 0,*/}
            {/*    right: 0,*/}
            {/*    bottom: 0,*/}
            {/*    top: 0*/}
            {/*}}*/}
            {children && <div style={{position: 'relative'}}>{children}</div>}
        </div>
    );
}

export default ParticlesContainer;