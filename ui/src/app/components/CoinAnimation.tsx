import React, { useState } from 'react';
import Image from "next/image";

interface CoinFlipProps {
  state: string;   
}

const CoinAnimation: React.FC<CoinFlipProps> = ({ state }) => {
  
  return (
    <div className="flex min-h-[70px] items-center justify-center">
  <div className="h-40 w-40 [perspective:800px]">
      {state === 'heads' || state == 'unclicked' ? <Image
            className="border-4 border-black/80 rounded-full"
            aria-hidden
            src="/img/heads.jpg"
            alt="heads"
            width={800}
            height={800}
          /> : <span/>}      
                {state === 'tails' ?  <Image
            className="border-1 border-black/80 rounded-full"
            aria-hidden
            src="/img/tails.jpg"
            alt="tails"
            width={1200}
            height={1200}
          /> : <span/>}     
      {state === 'flipping' ?

    <div className="animate-spinhorizon  relative h-full w-full rounded-full ring-1 [transform-style:preserve-3d]">    
      <div className=" [transform:translateZ(0.5rem)] bg-neutral-100 rounded-full  flex min-h-full flex-col items-center justify-center [backface-visibility:hidden] ring-1">
      <Image
            className="border-4 border-black/80 rounded-full"
            aria-hidden
            src="/img/heads.jpg"
            alt="heads"
            width={800}
            height={800}
          />
      </div>      
      <div className="absolute inset-0 h-full w-full  rounded-full bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center ring-1">
      <Image
            className="border-1 border-black/80 rounded-full"
            aria-hidden
            src="/img/tails.jpg"
            alt="tails"
            width={1200}
            height={1200}
          />
      </div>
    </div>
    : <span/>}  
  </div>
</div>

  );
};

export default CoinAnimation;
