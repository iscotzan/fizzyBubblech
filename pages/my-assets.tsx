import {useContext} from 'react'

import NFTContext from "../context/nft-context/nft-context";
import Card from "../components/card/card";
import NftCard from "../components/nft-card/nft-card";

const MyAssets = () => {

    const {nftState, isLoadingNfts} = useContext(NFTContext);
    const {myNFTs} = nftState
    if (!isLoadingNfts && !myNFTs.length) return (<h1 className="py-10 px-20 text-3xl">No assets owned</h1>)
    return (

        <div className="flex justify-center">
            <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {
                        myNFTs.map((nft, i) => (
                            <NftCard type={'display'} nft={nft} key={i} />



                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MyAssets;