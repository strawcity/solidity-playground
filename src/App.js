
import './App.css';
import { ethers } from 'ethers'
import abi from './utils/Playground.json'
import { useEffect, useState } from 'react';
import ErrorView from './components/ErrorView';

function App() {
  const [currentAccount, setCurrentAccount] = useState()
  const [siteError, setError] = useState({ showError: false, message: '' })

  const checkIfWalletIsConnected = () => {
    const { ethereum } = window
    console.log('check for wallet')
    if (!ethereum) {
      console.log('You need MetaMask for this!')
      return
    } else {
      console.log('We have the ethereum object: ', ethereum)
    }

    //Check if we're authorized to access the user's wallet
    ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
      // We could have multiple accounts, check for one.
      if (accounts.length !== 0) {
        // Grab the first account we have access to
        const account = accounts[0]
        console.log('found an authorized account: ', account)

        // Store the users public wallet address for later!

        setCurrentAccount(account)

      } else {
        console.log('No authorized account found')
      }
    })
  }

  useEffect(() => { checkIfWalletIsConnected() }, [])


  const connectWallet = () => {
    const { ethereum } = window
    if (!ethereum) {
      setError({ showError: true, error: 'You need MetaMask for this!' })
      return
    }

    ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        console.log('Connected ', accounts[0])
        setCurrentAccount(accounts[0])
      })
      .catch((err) => console.log(err))
  }



  return (
    <div className="App">
      <ErrorView setError={setError} siteError={siteError} />
      <div className="flex flex-col">
        <button className="bg-red-100 p-10 rounded-lg" onClick={() => connectWallet()}>CLICK ME</button>
      </div>
    </div>
  );
}

export default App;