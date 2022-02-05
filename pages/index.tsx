import {useContext} from 'react'
import NetworkContext from "../context/network-context/network-context";
import Loader from "../components/loader/loader";
import NFTContext from "../context/nft-context/nft-context";
import NftCard from "../components/nft-card/nft-card";

const HomePage = () => {
    const {networkState} = useContext(NetworkContext);
    const {nftState, isLoadingNfts} = useContext(NFTContext);
    const {nftMarketItems} = nftState
    if (!networkState.chainData) {
        return <h5>retry connection to network</h5>
    }
    if (!isLoadingNfts && !nftMarketItems.length) return (
        <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
    return (
        <div className="flex justify-center repulse-div" >
            <div className="px-4" style={{maxWidth: '1600px'}}>
                <div
                    className="grid grid-cols-1 grid-rows-1 sm:grid-rows-2 sm:grid-cols-2 lg:grid-rows-4 lg:grid-cols-4 gap-4 pt-4">
                    {isLoadingNfts && <Loader/>}
                    {
                        nftMarketItems.map((nft, i) => (
                            <NftCard type={'buy'} nft={nft} key={i}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default HomePage;