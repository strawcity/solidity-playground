import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis'

type MainViewProps = {
    setCurrentAccount: void
    setError: void
}

export default function MainView({ setCurrentAccount, setError }: MainViewProps) {
    const [tokenBalance, setTokenBalance] = useState({})
    const { authenticate, isAuthenticated, user, isInitialized } = useMoralis()
    const Web3Api = useMoralisWeb3Api()
    console.log(user)

    const fetchTokens = async () => {
        const options = { chain: 'rinkeby' }
        const balances = await Web3Api.account.getNFTs(options)
        setTokenBalance(balances)
    }

    useEffect(() => {
        if (isInitialized) {
            fetchTokens()
        }
    }, [])

    useEffect(() => {
        console.log(tokenBalance)
    }, [tokenBalance])

    if (!isAuthenticated) {
        return (
            <div>
                <button onClick={() => authenticate()}>Authenticate</button>
            </div>
        )
    }
    return (
        <div className='flex flex-col'>
            <button className='bg-red-100 p-10 rounded-lg'>CLICK ME</button>
        </div>
    )
}
