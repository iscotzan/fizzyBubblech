import React, {useContext} from 'react';
import {RiLoginCircleLine, RiLogoutCircleLine} from 'react-icons/ri'
import NetworkContext from "../../context/network-context/network-context";

interface IConnectButton {
}

const ConnectButton = (props: IConnectButton) => {
    const networkContext = useContext(NetworkContext);
    const {networkState, connect, disconnect} = networkContext;
    const connectSpan = <span
        className='flex text-white text-base font-semibold justify-between items-center h-full'><span
        className='lg:flex hidden'> Connect</span> <RiLoginCircleLine/></span>;
    const disconnectSpan = <span
        className='flex text-white text-base font-semibold justify-between items-center h-full'><span
        className='lg:flex hidden'> Disconnect</span><RiLogoutCircleLine/></span>;
    return (
        <button type='button' onClick={networkState.address ? disconnect : connect}
                className={`flex h-7  px-3 rounded-full cursor-pointer ${networkState.address ? 'bg-[#bac2de] hover:bg-[#8b94b3]' : 'bg-[#2952e3] hover:bg-[#2546bd]'}`}>
            {networkState.address ? disconnectSpan : connectSpan}
        </button>
    )
}

export default ConnectButton;