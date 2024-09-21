'use client'
import Image from "next/image";
import Logo from "@/app/components/logo";
import FlipCoin from "@/app/components/FlipCoin";
import RevealCoin from "@/app/components/revealCoin";
import { useAccount } from 'wagmi'
import Loader from "@/app/components/loaders";
import CoinAnimation from "@/app/components/CoinAnimation";

export default function Home() {

  const {  isConnecting, isDisconnected } = useAccount()

  return (
    
    <div className="grid  items-center justify-items-center min-h-screen p-8 pb-20 gap-10 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
        <div className="mx-auto"><Logo />        </div>
        {isDisconnected  ? 
        <p className="max-w-[500px] text-center font-mono">A super simple, consumer-focused, single-player, coin toss game with novel game mechanics, where a player can win a prize by flipping a coin.</p>
        : isConnecting ? <span/> : <span/>  }                   
        <div className="flex flex-col gap-4 mt-4 items-center mx-auto">
          {isDisconnected  ? <w3m-button /> : isConnecting ? <Loader/> : <><FlipCoin/><RevealCoin/>    </> }                   
                        
        {/* <CoinAnimation result="heads" flip={false} /> */}

        </div>      
      </main>
      <footer className="row-start-3 flex flex-col gap-6 flex-wrap items-center justify-center">
    
        <div className="flex flex-row items-center gap-2 text-xl">
   
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/DenhamPreen/merlions-bloom"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Github
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://envio.dev/app/denhampreen/merlions-bloom/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Indexer
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://docs.google.com/presentation/d/1BzL1gXjtR3qRsEIv-PXGdHmUB0KTBr1_CXucur4zXsY/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Slides
        </a>
        </div>
        <div className="flex flex-row items-center gap-2 font-mono">
      <div >Built on </div>
        <Image          
          src="https://cdn.prod.website-files.com/5f734f4dbd95382f4fdfa0ea/6631788b54df47d98ec362a5_flow-logomark.png"
          alt="Next.js logo"
          width={90}
          height={22}
          priority
        /> 
        <div>using <a href="https://reown.com/"  target="_blank" className="hover:underline hover:underline-offset-4"
          rel="noopener noreferrer">Reown</a></div>  
        </div>
      </footer>
      
    </div>
  );
}
