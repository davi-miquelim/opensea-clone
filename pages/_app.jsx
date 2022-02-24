import '../styles/globals.css'
import { ThirdwebWeb3Provider } from '@3rdweb/hooks'

/**
 * The chain ID 4 stands for Rinkeby testnet.
 * You can find the chain ID in the network tab of the MetaMask extension.
 * The `injected` connector is a web3 connection method used by Metamask
 */

const supportedChainIds = [4]

const connectors = {
  injected: {},
}

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      <Component {...pageProps} />
    </ThirdwebWeb3Provider>
  )
}

export default MyApp
