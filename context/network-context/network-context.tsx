import {providers} from 'ethers'
import Head from 'next/head'
import React, {useCallback, useEffect, useReducer, useState} from 'react'
import Web3Modal from 'web3modal'
import {ellipseAddress, getChainData} from '../../lib/utilities'
import {providerOptions, INFURA_ID} from './network-context-config'
import {networkInitialState, networkReducer} from "./network-context-reducer";
import {INetworkContextType, INetworkStateType} from "./netowrk-context-types";
import {IChainData} from "../../lib/types";
import {Web3Provider} from "@ethersproject/providers";

let web3Modal
if (typeof window !== 'undefined') {
    web3Modal = new Web3Modal({
        network: 'mainnet', // optional
        cacheProvider: true,
        providerOptions, // required
    })
}

const initialContext: INetworkContextType = {
    networkState: networkInitialState,
    connect: () => null,
    disconnect: () => null
}

export const NetworkContext = React.createContext<INetworkContextType>(initialContext);

export const NetworkProvider = ({children}: { children: React.ReactNode }): JSX.Element => {
    const [networkState, dispatch] = useReducer(networkReducer, networkInitialState)
    const {provider, web3Provider, address, chainId} = networkState

    const connect = useCallback(async function () {
        // This is the initial `provider` that is returned when
        // using web3Modal to connect. Can be MetaMask or WalletConnect.
        console.log('in connect', networkState)
        if (networkState.address) return;
        const provider = await web3Modal.connect()

        // We plug the initial `provider` into ethers.js and get back
        // a Web3Provider. This will add on methods from ethers.js and
        // event listeners such as `.on()` will be different.
        const web3Provider: Web3Provider = new providers.Web3Provider(provider)

        const signer = web3Provider.getSigner()
        const address = await signer.getAddress()

        const network = await web3Provider.getNetwork()

        const chainData = getChainData(network.chainId)
        dispatch({
            type: 'SET_WEB3_PROVIDER',
            provider,
            web3Provider,
            address,
            chainId: network.chainId,
            chainData: chainData
        })
    }, [])

    const disconnect = useCallback(
        async function () {
            await web3Modal.clearCachedProvider()
            if (provider?.disconnect && typeof provider.disconnect === 'function') {
                await provider.disconnect()
            }
            dispatch({
                type: 'RESET_WEB3_PROVIDER',
            })
        },
        [provider]
    )

    // Auto connect to the cached provider
    useEffect(() => {
        if (web3Modal.cachedProvider) {
            connect()
        }
    }, [connect])

    // A `provider` should come with EIP-1193 events. We'll listen for those events
    // here so that when a user switches accounts or networks, we can update the
    // local React state with that new information.
    useEffect(() => {
        if (provider?.on) {
            const handleAccountsChanged = (accounts: string[]) => {
                // eslint-disable-next-line no-console
                console.log('accountsChanged', accounts)
                dispatch({
                    type: 'SET_ADDRESS',
                    address: accounts[0],
                })
            }

            // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
            const handleChainChanged = (_hexChainId: string) => {
                window.location.reload()
            }

            const handleDisconnect = (error: { code: number; message: string }) => {
                // eslint-disable-next-line no-console
                console.log('disconnect', error)
                disconnect()
            }

            provider.on('accountsChanged', handleAccountsChanged)
            provider.on('chainChanged', handleChainChanged)
            provider.on('disconnect', handleDisconnect)

            // Subscription Cleanup
            return () => {
                if (provider.removeListener) {
                    provider.removeListener('accountsChanged', handleAccountsChanged)
                    provider.removeListener('chainChanged', handleChainChanged)
                    provider.removeListener('disconnect', handleDisconnect)
                }
            }
        }
    }, [provider, disconnect])


    return (
        <NetworkContext.Provider
            value={{networkState, connect, disconnect}}>{children}</NetworkContext.Provider>)
}

export default NetworkContext