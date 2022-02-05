import {useContext} from 'react'

import NFTContext from "../context/nft-context/nft-context";
import Card from "../components/card/card";
import NftCard from "../components/nft-card/nft-card";

const CreatorDashboard = () => {
    const {nftState, isLoadingNfts} = useContext(NFTContext);
    const {itemsCreated} = nftState

    if (!isLoadingNfts && !itemsCreated.length) return (<h1 className="py-10 px-20 text-3xl">No assets created</h1>)
    return (
        <div>
            <div className="p-4">
                <h2 className="text-2xl py-2">Items Created</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {
                        itemsCreated.map((nft, i) => (
                            // <div key={i} className="border shadow rounded-xl overflow-hidden">
                            <NftCard type='display' nft={nft} key={i}/>
                            //     <img src={nft.image} className="rounded"/>
                            //     <div className="p-4 bg-black">
                            //         <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                            //     </div>
                            // </NftCard>
                            // </div>
                        ))
                    }
                </div>
            </div>
            <div className="px-4">
                {
                    Boolean(itemsCreated.filter(x => x.sold).length) && (
                        <div>
                            <h2 className="text-2xl py-2">Items sold</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                                {
                                    itemsCreated.filter(x => x.sold).map((nft, i) => (
                                        <NftCard type='display' nft={nft} key={i}/>
                                        //     <div  className="border shadow rounded-xl overflow-hidden">
                                        //         <img src={nft.image} className="rounded"/>
                                        //         <div className="p-4 bg-black">
                                        //             <p className="text-2xl font-bold text-white">Price
                                        //                 - {nft.price} Eth</p>
                                        //         </div>
                                        //     </div>
                                        // </NftCard>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default CreatorDashboard;