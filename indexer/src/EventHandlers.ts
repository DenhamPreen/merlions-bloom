/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  MerlionsBloom,  
  User,
  Game,
  MerlionsBloom_RandomnessFulfilled,
  MerlionsBloom_RandomnessRequested,
} from "generated";

import {getOrCreateGlobalState} from "./utils/globalState"

// CoinFlipped(address indexed user, uint256 requestId, uint256 amount)
MerlionsBloom.CoinFlipped.handler(async ({ event, context }) => {

  let userParam = event.params.user
  let requestId = event.params.requestId
  let amount = event.params.amount

  // update global state entities
  let globalState = await getOrCreateGlobalState(context)

  context.GlobalState.set({
    ...globalState,
    currentDepositAmount: globalState.currentDepositAmount + BigInt(amount)
  })

  // update game entities
  context.Game.set({
    id: requestId.toString(),
    won: false,
    closed:false,
    user: userParam,
    amount: amount,       
    prize: 0n
})

  // update user entities

  let user : User | undefined = await context.User.get(userParam)

  if (user == undefined) {
    user = {
      id: userParam,
      user: userParam,
      totalNoOfGames: 1,
      totalNoOfGamesWon: 0,
      totalDeposit: amount,
      totalPrize: 0n,      
      latestGameRequestId: requestId
    }
  } else {
    user = {
      ...user,
      totalNoOfGames: user.totalNoOfGames + 1,            
      totalDeposit: user.totalDeposit + amount,      
      latestGameRequestId: requestId
    }
  }

  context.User.set(user)

});

// CoinRevealed(address indexed user, uint256 requestId, uint8 coinFace, uint256 prize)
MerlionsBloom.CoinRevealed.handler(async ({ event, context }) => {

  let userParam = event.params.user
  let requestId = event.params.requestId
  let coinFace = event.params.coinFace
  let prize = event.params.prize

  // update game entities
  let game: Game | undefined = await context.Game.get(requestId.toString())        

  if (game == undefined) {
      context.log.error("A game has to exist at this point");         
  } else { 
    context.Game.set({
      ...game,
      won: coinFace >= 6,  
      prize: prize,
      closed: true    
    })
  }

  // update user entities
  let user : User | undefined = await context.User.get(userParam)

  if (user == undefined) {
    throw new Error("User has to exist at this point")
  }

  context.User.set({
    ...user,
    totalPrize: user.totalPrize + prize,
    totalNoOfGamesWon: user.totalNoOfGamesWon + (coinFace >= 6 ? 1 : 0)
  })

});


MerlionsBloom.RandomnessFulfilled.handler(async ({ event, context }) => {
  const entity: MerlionsBloom_RandomnessFulfilled = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    requestId: event.params.requestId,
    flowHeight: event.params.flowHeight,
    evmHeight: event.params.evmHeight,
    randomResult: event.params.randomResult,
  };

  context.MerlionsBloom_RandomnessFulfilled.set(entity);
});


MerlionsBloom.RandomnessRequested.handler(async ({ event, context }) => {
  const entity: MerlionsBloom_RandomnessRequested = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    requestId: event.params.requestId,
    flowHeight: event.params.flowHeight,
    evmHeight: event.params.evmHeight,
  };

  context.MerlionsBloom_RandomnessRequested.set(entity);
});

