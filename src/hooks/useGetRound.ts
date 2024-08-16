import { useQuery } from "@tanstack/react-query";
import { fetchRound } from "../api/rounds";

export interface RoundDetails {
  items: string;
  height: string;
  id: string;
}

export const useGetRound = (id: number | null) => {
  const { isLoading, data, error } = useQuery<RoundDetails>({
    queryKey: ["round", id],
    queryFn: () => fetchRound(id),
    enabled: !!id,
  });

  return { isLoadingRound: isLoading, round: data, error };
};
