import { useState, useEffect } from 'react';
import { indexerEndpoint } from '../constants';

// TypeScript types
interface LatestGameRequestData {
  User: { latestGameRequestId: string }[]; // Assuming User has latestGameRequestId as a string
}

interface UseFetchLatestGameIdResult {
  isFetching: boolean;
  latestGameRequestId: string | null;
  error: string | null;
}

// Custom hook with userAddress parameter
export const useFetchLatestGameId = (userAddress: string): UseFetchLatestGameIdResult => {


  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [latestGameRequestId, setLatestGameRequestId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // GraphQL query that uses userAddress
  const LATEST_GAME_ID_QUERY = `
    query MyQuery {
      User(where: {user: {_eq: "${userAddress}"}}) {
        latestGameRequestId
      }
    }
  `;

  useEffect(() => {
    const fetchLatestGameId = async () => {
      setIsFetching(true);
      try {
        const response = await fetch(indexerEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',            
          },
          body: JSON.stringify({
            query: LATEST_GAME_ID_QUERY,
          }),
        });

        const jsonResponse = await response.json();

        if (response.ok && jsonResponse.data) {
          const latestId = jsonResponse.data.User[0].latestGameRequestId; // Accessing the first User's latestGameRequestId
          setLatestGameRequestId(latestId);
        } else {
          throw new Error('Failed to fetch latest game request ID');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setIsFetching(false);
      }
    };

    if (userAddress) {
      fetchLatestGameId();
    }
  }, [userAddress]); // Re-run when userAddress changes

  return { isFetching, latestGameRequestId, error };
};
