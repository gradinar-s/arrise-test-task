import { useQuery } from "@tanstack/react-query";
import { fetchRounds } from "../api/rounds";

interface Round {
  dateTime: number;
  roundId: string;
}

export const useGetRounds = () => {
  const { isPending, data, error } = useQuery<Round[]>({
    queryKey: ["rounds"],
    queryFn: fetchRounds,
  });

  return { isLoadingRounds: isPending, rounds: data, error };
};
