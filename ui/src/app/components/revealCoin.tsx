'use client'
import Button from "./elements/button";
import { useWriteContract } from 'wagmi'
import  abi  from '../abis/merlionBloomAbi.json'
import { contractAddress } from "../constants";
import React from "react";
import { toast } from 'react-hot-toast';
import { useFetchGameOutcome } from '../hooks/useFetchGameOutcome';

interface RevealCoinProps {
  setCoinAnimationState: (state: any) => void;
  selection: string;
  address: string;
}

export default function RevealCoin({setCoinAnimationState, selection, address}: RevealCoinProps) {  

  const [stateHack, setStateHack] = React.useState(false);

  const { isFetching, won, prize, closed , error :fetchError } = useFetchGameOutcome(address, stateHack);

  console.log("{isFetching, won, fetchError}")
  console.log({isFetching, won, prize ,fetchError})

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

        toast("Confirm tx in your wallet to reveal the outcome")
                
        writeContract({
          address: contractAddress,
          abi,
          functionName: 'revealCoin',                  
        })

        
      } 

      React.useEffect(() => {
        if (hash){
          toast.success(`Tx confirmed: ${hash.substring(0, 10)}...`)                    
          setStateHack(true)
        }
        if (error){
          toast.error(error.message)
        }
      }, [hash])
    
      React.useEffect(() => {
        if (closed) {
          if(won){
            setCoinAnimationState(selection) 
            toast.success(`Wohooo you won ${prize?.toString()} wei`) 
          }else {
            let oppositeSelection = selection === 'heads' ? 'tails' : 'heads'
            setCoinAnimationState(oppositeSelection)
            toast.error(`Bummer you lost`) 
          }
        }
      }, [stateHack, hash])
    
      return (
        
        <form onSubmit={submit}>          
          <button 
            disabled={isPending}
            type="submit"
          >
            
            {isPending ? 'Confirming...' : 'Reveal Coin'}
          </button>          
        </form>
        
    )
}