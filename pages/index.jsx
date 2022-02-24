import { useEffect } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import { useWeb3 } from '@3rdweb/hooks'
import { client } from '../lib/sanityClient'
import metaMask from '../assets/metafox.png'
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast'

const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42]  `,
  button: ` bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-white `,
  details: ` text-lg text-[#282b2f] font-semibold mt-4 mb-5`,
  cardContainer: `max-w-sm bg-white rounded-lg shadow-lg text-center p-[4rem]`,
}

const Home = () => {
  const { address, connectWallet } = useWeb3()

  const walletConnectedMessage = () => toast.success('Wallet Connected')

  useEffect(() => {
    if (!address) return
    ;(async () => {
      const userDoc = {
        _type: 'users',
        _id: 'address',
        userName: 'Unnanmed',
        walletAddress: address,
      }

      const result = await client.createIfNotExists(userDoc)
    })().then(() => walletConnectedMessage())
  }, [address])

  return (
    <div className={style.wrapper}>
      {address ? (
        <>
          <Header />
          <Hero />
        </>
      ) : (
        <div className={style.walletConnectWrapper}>
          <div className={style.cardContainer}>
            <Image height="150" width="150" src={metaMask} />
            <div className={style.details}>
              <p>
                Connect your Metamask wallet to see the latest collections,
                items, and accounts.
              </p>
            </div>
            <button
              className={style.button}
              onClick={() => connectWallet('injected')}
            >
              Connect Wallet
            </button>
          </div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default Home
