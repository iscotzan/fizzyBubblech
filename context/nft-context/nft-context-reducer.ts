import {INFTActionType, INFTState} from "./nft-context-types";

export const nftInitialState: INFTState = {
    nftMarketItems: [],
    myNFTs: [],
    itemsCreated: [],
}

export const nftReducer = (state: INFTState, action: INFTActionType): INFTState => {
    switch (action.type) {
        case 'SET_NFTS':
            return {
                ...state,
                [action.storage]: action.payload
            }
        default:
            throw new Error()
    }
}