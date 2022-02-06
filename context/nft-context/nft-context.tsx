import {ethers} from 'ethers'
import React, {useContext, useEffect, useReducer, useState} from 'react'

import {INFTContext, INFTItem} from "./nft-context-types";
import {nftInitialState, nftReducer} from "./nft-context-reducer";
import useLoadNFTs from "../../hooks/useLoadNFTs";
import {nftaddress, nftmarketaddress} from "../../config";
import Market from "../../artifacts/contracts/Market.sol/Market.json";
import NetworkContext from "../network-context/network-context";


const nftInitialContext: INFTContext = {
    nftState: nftInitialState,
    isLoadingNfts: false,
    isProcessingBuyOrder: [],
    isProcessingRemoveOrder: [],
    buyNft: (nft) => null,
    removeFromMarket: (nft) => null,
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
    const [isProcessingBuyOrder, setIsProcessingBuyOrder] = useState<number[]>([]);
    const [isProcessingRemoveOrder, setIsProcessingRemoveOrder] = useState<number[]>([]);
    const {networkState} = useContext(NetworkContext);
    const buyNft = async (nft) => {
        try {
            setIsProcessingBuyOrder([...isProcessingBuyOrder, nft.itemId])
            const signer = networkState.web3Provider.getSigner()
            const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
            const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
            const transaction = await contract.createMarketSale(nftaddress, nft.itemId, {
                value: price
            })
            await transaction.wait()
            reloadAllNftCollections()
            const indexOfItem = isProcessingBuyOrder.indexOf(nft.itemId);
            const newInProcess = [...isProcessingBuyOrder].splice(indexOfItem, 1);
            setIsProcessingBuyOrder(newInProcess)
        } catch (e) {
            const indexOfItem = isProcessingBuyOrder.indexOf(nft.itemId);
            const newInProcess = [...isProcessingBuyOrder].splice(indexOfItem, 1);
            setIsProcessingBuyOrder(newInProcess)
        }
    }

    const removeFromMarket = async (nft: INFTItem) =>{
        //todo:implement solidity contract to remove first
        return;
        try {
            setIsProcessingRemoveOrder([...isProcessingRemoveOrder, nft.itemId])
            const signer = networkState.web3Provider.getSigner()
            const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
            // const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
            const transaction = await contract.removeMarketItem(nftaddress, nft.itemId)
            await transaction.wait()
            reloadAllNftCollections()
            const indexOfItem = isProcessingRemoveOrder.indexOf(nft.itemId);
            const newInProcess = [...isProcessingRemoveOrder].splice(indexOfItem, 1);
            setIsProcessingRemoveOrder(newInProcess)
        } catch (e) {
            const indexOfItem = isProcessingRemoveOrder.indexOf(nft.itemId);
            const newInProcess = [...isProcessingRemoveOrder].splice(indexOfItem, 1);
            setIsProcessingRemoveOrder(newInProcess)
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
                isProcessingRemoveOrder,
                removeFromMarket,
                buyNft,
                reloadAllNftCollections
            }}>{children}</NFTContext.Provider>)
}

export default NFTContext