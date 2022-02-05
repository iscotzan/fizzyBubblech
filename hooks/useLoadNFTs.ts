import {useContext, useEffect, useState} from "react";
import {ethers} from "ethers";
import {nftaddress, nftmarketaddress} from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/Market.sol/Market.json";
import axios from "axios";
import NetworkContext from "../context/network-context/network-context";
import {INFTItem} from "../context/nft-context/nft-context-types";

export type UseLoadNFTS = [nft: INFTItem[], isLoading: boolean, loadNFTs: () => void]

export type ContractLoadFunctionName = 'fetchMarketItems' | 'fetchMyNFTs' | 'fetchItemsCreated'
const useLoadNFTs = (contractLoadFunctionName: ContractLoadFunctionName): UseLoadNFTS => {
    const [nfts, setNfts] = useState<INFTItem[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {networkState} = useContext(NetworkContext);

    const loadNFTs = async () => {

        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, networkState.web3Provider)
        const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, networkState.web3Provider.getSigner())
        let data;
        switch (contractLoadFunctionName) {
            case "fetchMarketItems":
                data = await marketContract.fetchMarketItems();
                break;
            case "fetchItemsCreated":
                data = await marketContract.fetchItemsCreated();
                break;
            case "fetchMyNFTs":
                data = await marketContract.fetchMyNFTs();
                break;
        }
        // const data = await marketContract[contractLoadFunctionName]()
        console.log('data for ', contractLoadFunctionName, data)
        const items = await Promise.all(data.map(async i => {
            const tokenUri = await tokenContract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item: INFTItem = {
                price,
                itemId: i.itemId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                name: meta.data.name,
                description: meta.data.description,
                sold: i.sold,
            }
            return item
        }))
        setNfts(items)
        console.log('setting', contractLoadFunctionName, 'with', items)
        setIsLoading(false)
    }


    useEffect(() => {
        const gotChain = networkState.chainData;
        console.log({gotChain})
        if (gotChain) loadNFTs();
    }, [networkState]);

    return [nfts, isLoading, loadNFTs];
};

export default useLoadNFTs;