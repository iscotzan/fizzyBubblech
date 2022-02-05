import React, {useContext} from 'react';
import NetworkContext from "../../context/network-context/network-context";
import {ellipseAddress} from "../../lib/utilities";

const ConnectionDetailsModule = () => {
    const networkContext = useContext(NetworkContext);
    const {networkState} = networkContext;
    return (
        <div>
            {
                networkState.address && (
                    <div className="flex justify-between px-5 py-2 text-white">
                        <div>
                            <span className="mb-1">Network: </span>
                            <span>{networkState.chainData?.name}</span>
                        </div>
                        <div>
                            <span className="mb-1">Address: </span>
                            <span>{ellipseAddress(networkState.address)}</span>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default ConnectionDetailsModule;