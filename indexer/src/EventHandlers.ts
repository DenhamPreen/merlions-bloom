/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  MerlionsBloom,
  GlobalState,
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
    currentDepositAmount: globalState.currentDepositAmount + BigInt(1e18)
  })

  // update game entities
  context.Game.set({
    id: requestId.toString(),
    coinFace: undefined,
    closed:false,
    user: userParam,
    amount: amount,       
    prize: undefined
})

  // update user entities

  let user : User | undefined = await context.User.get(userParam)

  if (user == undefined) {
    user = {
      id: userParam,
      user: userParam,
      totalNoOfGames: 1,
      totalNo0fGamesWon: 0,
      totalDeposit: amount,
      totalPrize: 0n      
    }
  } else {
    user = {
      ...user,
      totalNoOfGames: user.totalNo0fGamesWon + 1,      
      totalDeposit: user.totalDeposit + amount,      
    }
  }

  context.User.set(user)

});






// MerlionsBloom.CoinRevealed.handler(async ({ event, context }) => {

// let game: Game | undefined = await context.Game.get(requestId.toString())        

// if (game == undefined) {
//     game =         
// } 




//   const entity: MerlionsBloom_CoinRevealed = {
//     id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
//     user: event.params.user,
//     requestId: event.params.requestId,
//     coinFace: event.params.coinFace,
//     prize: event.params.prize,
//   };

//   context.MerlionsBloom_CoinRevealed.set(entity);
// });


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




// export function handleUser(event: NewGreetingEvent): void {
//   let entity = new User(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.user = event.params.user
//   entity.greeting = event.params.greeting

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }


// function processCoinFlip(result: CoinFlipResult): void {
//   const { userId, depositAmount, coinFlip } = result;

//   // Check if the user already exists, if not create a new user starting with 0 balance
//   if (!users.has(userId)) {
//       users.set(userId, {
//           id: userId,
//           address: `address_of_${userId}`,
//           balance: 0
//       });
//   }

//   // Determine win or lose based on coinFlip number
//   const isWin = coinFlip >= 6 && coinFlip <= 9;
//   const prize = depositAmount; // Assuming the prize is equal to the deposit amount

//   // Update user's balance
//   const user = users.get(userId);
//   if (user) {
//       if (isWin) {
//           user.balance += prize;
//       } else {
//           user.balance -= prize;
//       }
//   }


