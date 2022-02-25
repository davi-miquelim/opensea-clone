import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useWeb3 } from '@3rdweb/hooks'
import { client } from '../../lib/sanityClient'
import { ThirdwebSDK } from '@3rdweb/sdk'
import NFTCard from '../../components/NFTCard'
import { CgWebsite } from 'react-icons/cg'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { HiDotsVertical } from 'react-icons/hi'

const style = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-centerr items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-coveer rounded-full border-2 border-[#202225] mt-[4rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r2`,
  title: `teext-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}

const Collection = () => {
  const router = useRouter()
  const { provider } = useWeb3()
  const { collectionId } = router.query
  const [collection, setCollection] = useState({})
  const [nfts, setNfts] = useState([])
  const [listings, setListings] = useState([])

  const nftModule = useMemo(() => {
    if (!provider) return
    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      'https://eth-rinkeby.alchemyapi.io/v2/t800O5NQLEXMGEgbg5-taiOrAwzDcnyI'
    )
    return sdk.getNFTModule(collectionId)
  }, [provider])

  useEffect(() => {
    if (!nftModule) return
    ;async () => {
      const nfts = await nftModule.getAll()
      setNfts(nfts)
    }
  })

  const marketPlaceModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      'https://eth-rinkeby.alchemyapi.io/v2/t800O5NQLEXMGEgbg5-taiOrAwzDcnyI'
    )
    return sdk.getMarketplaceModule(
      '0xD8ADcBa000fdEd34e38Ce6d170568269F06BE66c'
    )
  }, [provider])

  // get all listing in the collection
  useEffect(() => {
    if (!marketPlaceModule) return
    ;(async () => {
      setListings(await marketPlaceModule.getAllListings())
    })()
  }, [marketPlaceModule])

  const fetchCollectionData = async (sanityClient = client) => {
    const nftCollectionQuery = `*[_type == "marketItems" && contractAddress == ${collectionId}
    "imageUrl": profileImage.asset->url,
    "bannerImageUrl": bannerImage.asset->url,
    volumeTraded,
    createdBy,
    contractAddress,
    "creator": createdBy->userName,
    title, floorPrice,
    "allOwners": owners[]->,
    description]`

    const result = await sanityClient.fetch(nftCollectionQuery)

    setCollection(result)
  }

  useEffect(() => {
    fetchCollectionData()
  }, [collectionId])

  return (
    <div className="overflow-hidden">
      <div className={style.bannerImageContainer}>
        <img
          className={style.bannerImage}
          src={
            collection?.bannerImageUrl
              ? collection.bannerImageUrl
              : 'https://via.placeholder.com/200'
          }
        />
      </div>
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <img
            className={style.profileImg}
            src={
              collection?.imageUrl
                ? collection.imageUrl
                : 'https://via.placeholder.com/200'
            }
          />
        </div>
      </div>
      <div className={style.endRow}>
        <div className={style.socialIconsContainer}>
          <div className={style.socialIconsWrapper}>
            <div className={style.socialIconsContent}>
              <div className={style.socialIcon}>
                <CgWebsite />
              </div>
              <div className={style.divider} />
              <div className={style.socialIcon}>
                <AiOutlineInstagram />
              </div>
              <div className={style.socialIcon}>
                <AiOutlineTwitter />
              </div>
              <div className={style.socialIcon}>
                <HiDotsVertical />
              </div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.title}>{collection?.title}</div>
        </div>
        <div className={style.midRow}>
          Created by
          <span className={style.createdBy}>{collection?.creator}</span>
        </div>
        <div className={style.midRow}>
          <div className={style.statValue}>{nfts.length}</div>
          <div className={style.statName}>items</div>
        </div>
        <div className={style.collectionStat}>
          <div className={style.statValue}>
            {collection?.allOwners ? collection.allOwners.length : ''}
          </div>
        </div>
        <div className={style.collectionStat}>
          <div className={style.statValue}>
            <Image
              src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
              className={style.ethLogo}
              width="50"
              height="50"
            />
          </div>
          {collection?.floorPrice}
        </div>
        <div className={style.collectionStat}>
          <div className={style.statValue}>
            <Image
              src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
              className={style.ethLogo}
              width="50"
              height="50"
            />
            {collection?.volumeTraded}
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.description}>{collection?.description}</div>
        </div>
        <div className="flex flex-wrap">
          {nfts.map((nftItem, id) => (
            <NFTCard
              key={id}
              nftItem={nftItem}
              title={collection?.tilte}
              listings={listings}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection
