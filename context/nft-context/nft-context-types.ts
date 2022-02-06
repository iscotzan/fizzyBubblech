import useLoadNFTs from "../../hooks/useLoadNFTs";

export interface INFTItem {
    price: string,
    itemId: number,
    seller: string,
    owner: string,
    image: string,
    name: string,
    description: string,
    sold?: boolean
}

export interface INFTContext {
    nftState: INFTState
    isLoadingNfts: boolean,
    isProcessingBuyOrder: number[],
    isProcessingRemoveOrder: number[],
    buyNft: (nft: INFTItem) => void;
    removeFromMarket: (nft: INFTItem) => void;
    reloadAllNftCollections: () => void;
}

export interface INFTState {
    nftMarketItems: INFTItem[],
    myNFTs: INFTItem[],
    itemsCreated: INFTItem[],
}

export type NFTStorageType = 'nftMarketItems' |
    'myNFTs' |
    'itemsCreated'
export type INFTActionType =
    | {
    type: 'SET_NFTS',
    payload: INFTItem[],
    storage: NFTStorageType

} | {
    type: 'SET_LOADING_NFTS'
    payload: boolean
}