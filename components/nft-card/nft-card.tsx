import React, {useContext, useEffect, useState} from 'react';
import {INFTItem} from "../../context/nft-context/nft-context-types";
import NetworkContext from "../../context/network-context/network-context";
import NFTContext from "../../context/nft-context/nft-context";
import Card from "../card/card";
import {Button, Dimmer, Image, Loader} from "semantic-ui-react";

interface NftCard {
    type: 'display' | 'buy',
    nft: INFTItem;
}

function NftCard(props: NftCard) {
    const {type, nft} = props;
    const {networkState} = useContext(NetworkContext);
    const {buyNft, removeFromMarket, isProcessingRemoveOrder, isProcessingBuyOrder, nftState} = useContext(NFTContext);

    return (
        <Card>

            <div className="border-4 border-yellow-500/75 shadow rounded-xl overflow-hidden">
                <div className="p-5 bg-pink-900/25">
                    <Image
                        className="object-contain h-96 w-192"
                        centered
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
                    networkState.address !== nft.seller ?
                        <Button onClick={() => buyNft(nft)} disabled={isProcessingBuyOrder.indexOf(nft.itemId) !== -1}
                                size={'massive'} loading={isProcessingBuyOrder.indexOf(nft.itemId) !== -1}
                                color={'pink'} className={'w-full'}>
                            Buy
                        </Button> :

                        <Button onClick={() => removeFromMarket(nft)}
                                disabled={isProcessingRemoveOrder.indexOf(nft.itemId) !== -1}
                                size={'massive'} loading={isProcessingRemoveOrder.indexOf(nft.itemId) !== -1}
                                color={'orange'} className={'w-full'}>
                            Remove From Market
                        </Button>
                    }
                </div>
            </div>
        </Card>
    );
}

export default NftCard;
