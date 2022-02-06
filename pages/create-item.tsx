import {useContext, useState} from 'react'
import {ethers} from 'ethers'
import {create as ipfsHttpClient} from 'ipfs-http-client'
import {useRouter} from 'next/router'

const client = ipfsHttpClient({url: 'https://ipfs.infura.io:5001/api/v0'})

import {
    nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/Market.json'
import NetworkContext from "../context/network-context/network-context";
import NFTContext from "../context/nft-context/nft-context";
import ProgressBar from 'react-bootstrap/ProgressBar'
import {Button, Image, Loader, Progress} from "semantic-ui-react";

const CreateItem = () => {
    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, updateFormInput] = useState({price: '', name: '', description: ''})
    const router = useRouter()
    const {networkState} = useContext(NetworkContext);
    const {reloadAllNftCollections} = useContext(NFTContext);
    const {web3Provider} = networkState;
    const [currentFile, setCurrentFile] = useState<File>()
    const [currentUploadProgress, setCurrentUploadProgress] = useState<number>(0)
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function onChange(e) {
        try {
            const file = e.target.files[0]
            setCurrentFile(file)
        } catch (e) {
            console.error(e)
        }
    }

    const uploadFile = async () => {
        if (!currentFile) return;
        let filesize = currentFile.size;
        const updateProgress = (progress: number) => {
            setCurrentUploadProgress(progress)
        }
        try {
            setCurrentUploadProgress(0);
            setIsUploading(true);
            const added = await client.add(
                currentFile,
                {
                    progress: (prog) => updateProgress((prog / filesize) * 100)//console.log({progress: (prog / filesize) * 100, prog, filesize})

                    // console.log(`received: ${prog}`)

                }
            )
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            setFileUrl(url)
            setIsUploading(false)
            return url
        } catch (error) {
            setIsUploading(false)
            console.log('Error uploading file: ', error)
        }
    }

    async function createMarket() {
        const {name, description, price} = formInput
        const fileUrl = await uploadFile()
        console.log({fileUrl, name, description, price})
        if (!name || !description || !price || !fileUrl) return
        /* first, upload to IPFS */
        const data = JSON.stringify({
            name, description, image: fileUrl
        })
        try {
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
            createSale(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    async function createSale(url) {
        try {

            setIsLoading(true);

            const signer = web3Provider.getSigner()

            /* next, create the item */
            let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
            let transaction = await contract.createToken(url)
            let tx = await transaction.wait()
            let event = tx.events[0]
            let value = event.args[2]
            let tokenId = value.toNumber()

            const price = ethers.utils.parseUnits(formInput.price, 'ether')

            /* then list the item for sale on the marketplace */
            contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
            let listingPrice = await contract.getListingPrice()
            listingPrice = listingPrice.toString()

            transaction = await contract.createMarketItem(nftaddress, tokenId, price, {value: listingPrice})
            await transaction.wait()
            await reloadAllNftCollections()
            setIsLoading(false)
            router.push('/')
        } catch (e) {
            setIsLoading(false)
            console.error(e)
        }
    }

    return (
        <div className="flex justify-center">
            <div className="w-1/2 flex flex-col pb-12 text-orange-500">
                <input
                    placeholder="Asset Name"
                    className="mt-8 border rounded p-4"
                    onChange={e => updateFormInput({...formInput, name: e.target.value})}
                />
                <textarea
                    placeholder="Asset Description"
                    className="mt-2 border rounded p-4"
                    onChange={e => updateFormInput({...formInput, description: e.target.value})}
                />
                <input
                    placeholder="Asset Price in Eth"
                    className="mt-2 border rounded p-4"
                    onChange={e => updateFormInput({...formInput, price: e.target.value})}
                />
                <input
                    type="file"
                    name="Asset"
                    className="my-4"
                    onChange={onChange}
                />
                {
                    fileUrl && (
                        <Image className="my-4" centered size={'big'} src={fileUrl}/>
                    )
                }
                <Button onClick={createMarket} color={'pink'} size={'massive'}
                        className={`font-bold ${isLoading || isUploading ? 'animate-pulse' : ''}`} loading={isLoading}
                        content={isLoading ? 'awaiting blocks' : isUploading ? 'Create Digital Asset ' + currentUploadProgress + '%' : 'Create Digital Asset'}>
                </Button>
                {/*{isUploading && <ProgressBar striped variant="danger" now={currentUploadProgress}/>}*/}
                {isUploading && <Progress percent={currentUploadProgress} color='green'/>}

            </div>
        </div>
    )
}

export default CreateItem;