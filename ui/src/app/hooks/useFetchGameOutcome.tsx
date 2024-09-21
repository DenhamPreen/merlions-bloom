import { useState, useEffect } from 'react';
import { indexerEndpoint } from '../constants';
import { useFetchLatestGameId } from './useFetchLatestGameId';


// TypeScript types
interface GameOutcomeData {
  Game: { won: boolean; prize: number, closed: boolean }[]; // Assuming `won` is a boolean and `prize` is a number
}

interface UseFetchGameOutcomeResult {
  isFetching: boolean;
  won: boolean | null;
  prize: number | null;
  error: string | null;
  closed: boolean | null;
}

// Custom hook with gameId parameter
export const useFetchGameOutcome = (address: string, stateHack: boolean): UseFetchGameOutcomeResult => {
  const { isFetching : latestGameIsFetching, latestGameRequestId, error :fetchError } = useFetchLatestGameId(address);


  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [won, setWon] = useState<boolean | null>(null);
  const [prize, setPrize] = useState<number | null>(null);
  const [closed, setClosed] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  // GraphQL query that uses gameId
  const GAME_OUTCOME_QUERY = `
    query GameOutcome {
      Game(where: {id: {_eq: "${latestGameRequestId}"}}) {
        won
        prize
        closed
      }
    }
  `;

  useEffect(() => {
    const fetchGameOutcome = async () => {
      setIsFetching(true);
      try {
        const response = await fetch(indexerEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',            
          },
          body: JSON.stringify({
            query: GAME_OUTCOME_QUERY,
          }),
        });

        const jsonResponse = await response.json();

        if (response.ok && jsonResponse.data) {
          const game = jsonResponse.data.Game[0]; // Assuming there's always one result for the given ID
          setWon(game.won);
          setPrize(game.prize);
          setClosed(game.closed);
        } else {
          throw new Error('Failed to fetch game outcome');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setIsFetching(false);
      }
    };

    if (latestGameRequestId) {
      fetchGameOutcome();
    }
  }, [latestGameRequestId,isFetching, stateHack]); // Re-run when gameId changes

  return { isFetching, won, prize, closed, error };
};
