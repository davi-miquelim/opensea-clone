import React from 'react'

const style = {
  wrapper: `relative`,
  container: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://lh3.googleusercontent.com/hngnAFc6WIKfzc4QDI0FN6iljKT1F-lUjUN1itrrL_qoMwyhqxQCNLtoIHOpl7NO3jI-XqWprFVTItO1dKu1OMq3gai2pIkJxJTRvI0=s550')] before:bg-cover before:bg-center before:opacity-30 before:blur`,
  contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
  copyContainer: `w-1/2`,
  title: `relative  text-white text-[46px] font-semibold`,
  description: `text-[#8a939b] container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem]`,
  ctaContainer: `flex`,
  accentedButton: ` relative text-lg font-semibold px-12 py-4 bg-[#2181e2] rounded-lg mr-5 text-white hover:bg-[#42a0ff] cursor-pointer`,
  button: ` relative text-lg font-semibold px-12 py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,
  cardContainer: `rounded-[3rem]`,
  infoContainer: `h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white`,
  author: `flex flex-col justify-center ml-4 font-semibold`,
  name: ``,
  infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
}

const Hero = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.contentWrapper}>
          <div className={style.copyContainer}>
            <h1 className={style.title}>
              Discover, collect, and sell extraordinary NFTs
            </h1>
            <div className={style.description}>
              OpenSea is the world&apos;s first and largestNFT marketplace
            </div>
            <div className={style.ctaContainer}>
              <button className={style.accentedButton}>Explore</button>
              <button className={style.button}>Create</button>
            </div>
          </div>
          <div className={style.cardContainer}>
            <img
              className="t-lg rounded"
              src="https://lh3.googleusercontent.com/hngnAFc6WIKfzc4QDI0FN6iljKT1F-lUjUN1itrrL_qoMwyhqxQCNLtoIHOpl7NO3jI-XqWprFVTItO1dKu1OMq3gai2pIkJxJTRvI0=s550"
            />
            <div className={style.infoContainer}>
              <img
                className="h-[2.5rem] rounded-full"
                src="https://lh3.googleusercontent.com/-BIGJxUthMVboDTqsGzbP_iP6HKc7vta-k0Mpe4B3Cv3o9MUgkiBLUoe6WwxDZqeHshgLyhdlqV5ES6sAFEcWIQZwQyEXbZiiGMk=s80"
              />
              <div className={style.author}>
                <div className={style.name}>
                  Tarhana ( A traditional Turkish Soup )
                </div>
                <a
                  className="text-[#1868b7]"
                  href="https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/51470102808854661546804951401744198772813539315189006212909197942426062290945"
                >
                  fdilekuyar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
