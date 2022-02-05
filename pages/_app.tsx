import '../styles/globals.css'
import {NetworkProvider} from "../context/network-context/network-context";
import {NFTProvider} from "../context/nft-context/nft-context";
import ConnectionDetailsModule from "../components/connection-details-module/connection-details-module";
import Nav from "../components/nav";
import useKeyPressed from "../hooks/useKeyPressed";
import ParticlesContainer from "../components/particles/particles-container";

const Marketplace = ({Component, pageProps}) => {
    const onPressP = () => {
        console.log('sorry can\'t pause this :)')
    }
    useKeyPressed('p', onPressP);
    return (
        <NetworkProvider>
            <NFTProvider>
                <div className='keep-scrolling app-container gradient-bg-transactions'>
                    <ParticlesContainer>

                        <div>
                            <Nav/>
                        </div>
                        <div>
                            <ConnectionDetailsModule/>
                            <Component {...pageProps} />
                        </div>
                    </ParticlesContainer>
                </div>
            </NFTProvider>
        </NetworkProvider>
    )
}

export default Marketplace
