'use client'
import Button from "./elements/button";
import { useWriteContract, useReadContract } from 'wagmi'
import  abi  from '../abis/merlionBloomAbi.json'
import { contractAddress } from "../constants";
import { formatEther } from 'viem';
import React from "react";
import { toast } from 'react-hot-toast';

interface FlipCoinProps {
  setCoinAnimationState: (state: any) => void;
  setSelection: (state: any) => void;
}

export default function FlipCoin({ setCoinAnimationState, setSelection }: FlipCoinProps) {

  

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
        const formData = new FormData(e.target as HTMLFormElement) 
        

        console.log("a")
 
        writeContract({
          address: contractAddress,
          abi,
          functionName: 'flipCoin',        
          value: currentDepositAmountKnown,
        })

        setCoinAnimationState('flipping')
        toast("Confirm tx in your wallet then reveal flip in the next transaction")

        console.log("b")
      } 

      React.useEffect(() => {
        if (hash){
          toast.success(`Tx confirmed: ${hash.substring(0, 10)}...`)
        }
        if (error){
          toast.error(error.message)
        }
      }, [hash, isPending])
    
      return (
        <>
        <form onSubmit={submit} className="flex flex-row gap-4 items-center mx-auto">                       

          <span onClick={() => setSelection('heads')}>

          
          <button disabled={isPending} type="submit" >
          <Button             
            isPending={isPending}
            label={isPending ? 'Confirming...' : 'Heads'}
            />
          </button>
            </span>
            <span onClick={() => setSelection('tails')}>
          <Button 
            isPending={isPending}
            label={isPending ? 'Confirming...' : 'Tails'}
          />
          </span>
          
            
          {/* {hash && <div>Transaction Hash: {hash}</div>} */}
        </form>
          <p className="text-xs text-gray-400 text-center mt-3"> {formatEther(currentDepositAmountKnown ? currentDepositAmountKnown : 0n)} FLOW tokens to play</p>
          </>
        
    )
}