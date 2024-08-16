import { useQuery } from "@tanstack/react-query";
import { fetchRounds } from "../api/rounds";

interface Round {
  dateTime: number;
  roundId: string;
}

export const useGetRounds = () => {
  const { isLoading, data, error } = useQuery<Round[]>({
    queryKey: ["rounds"],
    queryFn: fetchRounds,
  });

  return { isLoadingRounds: isLoading, rounds: data, error };
};
