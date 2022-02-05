import {IChainData} from "../../lib/types";
import {Web3Provider} from "@ethersproject/providers";

export interface INetworkStateType {
    provider?: any
    web3Provider?: Web3Provider
    address?: string
    chainId?: number
    chainData?: IChainData
}

export type INetworkActionType =
    | {
    type: 'SET_WEB3_PROVIDER'
    provider?: INetworkStateType['provider']
    web3Provider?: INetworkStateType['web3Provider']
    address?: INetworkStateType['address']
    chainId?: INetworkStateType['chainId'],
    chainData?: IChainData
} | {
    type: 'SET_CHAIN_DATA'
    payload?: IChainData
}
    | {
    type: 'SET_ADDRESS'
    address?: INetworkStateType['address']
}
    | {
    type: 'SET_CHAIN_ID'
    chainId?: INetworkStateType['chainId']
}
    | {
    type: 'RESET_WEB3_PROVIDER'
}

export interface INetworkContextType {
    networkState: INetworkStateType,
    connect: () => void,
    disconnect: () => void,
}
