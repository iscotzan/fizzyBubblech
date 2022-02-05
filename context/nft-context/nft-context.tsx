import {ethers} from 'ethers'
import React, {useContext, useEffect, useReducer, useState} from 'react'

import {INFTContext} from "./nft-context-types";
import {nftInitialState, nftReducer} from "./nft-context-reducer";
import useLoadNFTs from "../../hooks/useLoadNFTs";
import {nftaddress, nftmarketaddress} from "../../config";
import Market from "../../artifacts/contracts/Market.sol/Market.json";
import NetworkContext from "../network-context/network-context";


const nftInitialContext: INFTContext = {
    nftState: nftInitialState,
    isLoadingNfts: false,
    isProcessingBuyOrder: false,
    buyNft: (nft) => null,
    reloadAllNftCollections: () => null
}

export const NFTContext = React.createContext<INFTContext>(nftInitialContext);

export const NFTProvider = ({children}: { children: React.ReactNode }): JSX.Element => {
    const [nftState, dispatch] = useReducer(nftReducer, nftInitialState)
    //todo: there seems to be a mixup between itemsCreated and myNFTs, also, should recieve sold and unsold items by argument
    const [nftMarketItems, isLoadingMarketItems, loadMarketItems] = useLoadNFTs('fetchMarketItems');
    const [nftMyItems, isLoadingMyItems, loadMyItems] = useLoadNFTs('fetchMyNFTs');
    const [nftItemsCreated, isLoadingItemsCreated, loadItemsCreated] = useLoadNFTs('fetchItemsCreated');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isProcessingBuyOrder, setIsProcessingBuyOrder] = useState<boolean | number>(false);
    const {networkState} = useContext(NetworkContext);
    const buyNft = async (nft) => {
        try {
            setIsProcessingBuyOrder(nft.itemId)
            const signer = networkState.web3Provider.getSigner()
            const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
            const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
            const transaction = await contract.createMarketSale(nftaddress, nft.itemId, {
                value: price
            })
            await transaction.wait()
            reloadAllNftCollections()
            setIsProcessingBuyOrder(false)
        } catch (e) {
            setIsProcessingBuyOrder(false)
        }
    }
    const reloadAllNftCollections = () => {
        loadMarketItems()
        loadMyItems()
        loadItemsCreated()
    }
    useEffect(() => {
        if (isLoadingMarketItems || isLoadingItemsCreated || isLoadingMyItems) {
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }
    }, [isLoadingMyItems, isLoadingMarketItems, isLoadingItemsCreated])
    useEffect(() => {
        console.log(`useEffect new value, setting nftMarketItems`, nftMarketItems)
        dispatch({type: "SET_NFTS", payload: nftMarketItems, storage: 'nftMarketItems'})
    }, [nftMarketItems])

    useEffect(() => {
        console.log(`useEffect new value, setting nftItemsCreated`, nftItemsCreated)
        dispatch({type: "SET_NFTS", payload: nftItemsCreated, storage: 'itemsCreated'})
    }, [nftItemsCreated])

    useEffect(() => {
        console.log(`useEffect new value, setting nftMyItems`, nftMyItems)
        dispatch({type: "SET_NFTS", payload: nftMyItems, storage: 'myNFTs'})
    }, [nftMyItems])

    return (
        <NFTContext.Provider
            value={{
                nftState,
                isLoadingNfts: isLoading,
                isProcessingBuyOrder,
                buyNft,
                reloadAllNftCollections
            }}>{children}</NFTContext.Provider>)
}

export default NFTContext