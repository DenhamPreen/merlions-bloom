/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  MerlionsBloom,
  MerlionsBloom_CoinFlipped,
  MerlionsBloom_CoinRevealed,
  MerlionsBloom_RandomnessFulfilled,
  MerlionsBloom_RandomnessRequested,
} from "generated";

MerlionsBloom.CoinFlipped.handler(async ({ event, context }) => {
  const entity: MerlionsBloom_CoinFlipped = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    user: event.params.user,
    requestId: event.params.requestId,
    amount: event.params.amount,
  };

  context.MerlionsBloom_CoinFlipped.set(entity);
});

MerlionsBloom.CoinRevealed.handler(async ({ event, context }) => {
  const entity: MerlionsBloom_CoinRevealed = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    user: event.params.user,
    requestId: event.params.requestId,
    coinFace: event.params.coinFace,
    prize: event.params.prize,
  };

  context.MerlionsBloom_CoinRevealed.set(entity);
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

