'use client'
import Button from "./elements/button";
import { useWriteContract, useReadContract } from 'wagmi'
import  abi  from '../abis/merlionBloomAbi.json'
import { contractAddress } from "../constants";
import { formatEther } from 'viem';



export default function FlipCoin() {

    const {data: currentDepositAmount, error: amountError, isFetching: isAmountFetching} = useReadContract({
      address: contractAddress,
      abi,
      functionName: 'currentDepositAmount',
    })

    let currentDepositAmountKnown: bigint | undefined  = currentDepositAmount as bigint | undefined

    // console.log({currentDepositAmount, amountError, isAmountFetching})

    const { 
        data: hash, 
        isPending,
        error,
        writeContract 
      } = useWriteContract() 
    
      console.log({isPending, error})

      async function submit(e: React.FormEvent<HTMLFormElement>) { 
        e.preventDefault() 
        
        console.log("a")
 
        writeContract({
          address: contractAddress,
          abi,
          functionName: 'flipCoin',        
          value: currentDepositAmountKnown,
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
            
            {isPending ? 'Confirming...' : 'Flip coin'}
          </button>
          {hash && <div>Transaction Hash: {hash}</div>}
          <p className="text-xs text-gray-400"> {formatEther(currentDepositAmountKnown ? currentDepositAmountKnown : 0n)} FLOW tokens to play</p>
        </form>
        
    )
}