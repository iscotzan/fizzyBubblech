import React, {useContext} from 'react';
import Loader from "../loader/loader";
import {INFTItem} from "../../context/nft-context/nft-context-types";
import NetworkContext from "../../context/network-context/network-context";
import NFTContext from "../../context/nft-context/nft-context";
import Card from "../card/card";

interface NftCard {
    type: 'display' | 'buy',
    nft: INFTItem;
}

function NftCard(props: NftCard) {
    const {type, nft} = props;
    const {networkState} = useContext(NetworkContext);
    const {buyNft, isProcessingBuyOrder} = useContext(NFTContext);
    return (
        <Card>

            <div className="border-4 border-yellow-500/75 shadow rounded-xl overflow-hidden">
                <div className="p-5 bg-pink-900/25">
                    <img
                        className="object-contain h-96 w-192"
                        src={nft.image}/>
                    <div className="mt-4 p-4">
                        <p style={{height: '64px'}} className=" text-white text-2xl font-semibold">{nft.name}</p>
                        <div style={{height: '70px', overflow: 'hidden'}}>
                            <p className="text-white">{nft.description}</p>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-black">
                    <p className="text-2xl mb-4 font-bold text-white">{nft.price} {networkState.chainData.native_currency.symbol.toUpperCase()}</p>
                    {props.type === 'buy' &&
                    <button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                            disabled={isProcessingBuyOrder === nft.itemId}
                            onClick={() => buyNft(nft)}>{isProcessingBuyOrder === nft.itemId ? <Loader/> : 'Buy'}
                    </button>
                    }
                </div>
            </div>
        </Card>
    );
}

export default NftCard;
