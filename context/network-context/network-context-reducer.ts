import {INetworkActionType, INetworkStateType} from "./netowrk-context-types";

export const networkInitialState: INetworkStateType = {
    provider: null,
    web3Provider: null,
    address: null,
    chainId: null,
    chainData: null
}
export const networkReducer = (state: INetworkStateType, action: INetworkActionType): INetworkStateType => {
    switch (action.type) {
        case 'SET_WEB3_PROVIDER':
            return {
                ...state,
                provider: action.provider,
                web3Provider: action.web3Provider,
                address: action.address,
                chainId: action.chainId,
                chainData: action.chainData
            }
        case "SET_CHAIN_DATA":
            return {
                ...state,
                chainData: action.payload
            }
        case 'SET_ADDRESS':
            return {
                ...state,
                address: action.address,
            }
        case 'SET_CHAIN_ID':
            return {
                ...state,
                chainId: action.chainId,
            }
        case 'RESET_WEB3_PROVIDER':
            return networkInitialState
        default:
            throw new Error()
    }
}