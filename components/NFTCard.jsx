import Image from 'next/image'

const NFTCard = ({ nftItem }) => {
  return <Image src={nftItem.image} height="100" width="100" />
}

export default NFTCard
