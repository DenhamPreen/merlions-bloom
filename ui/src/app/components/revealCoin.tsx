'use client'
import Button from "./elements/button";
import { useWriteContract } from 'wagmi'
import  abi  from '../abis/merlionBloomAbi.json'
import { contractAddress } from "../constants";


export default function RevealCoin() {
    const { 
        data: hash, 
        isPending,
        error,
        writeContract 
      } = useWriteContract() 
    
      console.log({ isPending,
        error})

      async function submit(e: React.FormEvent<HTMLFormElement>) { 
        e.preventDefault() 
        const formData = new FormData(e.target as HTMLFormElement) 
        
        console.log("a")
        writeContract({
          address: contractAddress,
          abi,
          functionName: 'revealCoin',                  
        })

        console.log("b")
      } 

    //   Button label="Play" onClick={() => console.log("play")} />
    
      return (
        
        <form onSubmit={submit}>          
          <button 
            disabled={isPending}
            type="submit"
          >
            
            {isPending ? 'Confirming...' : 'Reveal Coin'}
          </button>
          {hash && <div>Transaction Hash: {hash}</div>}
        </form>
        
    )
}