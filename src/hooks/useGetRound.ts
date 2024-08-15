import { useQuery } from "@tanstack/react-query";
import { fetchRound } from "../api/rounds";

export interface RoundDetails {
  items: string;
  height: string;
  id: string;
}

export const useGetRound = (id: number) => {
  const { isPending, data, error } = useQuery<RoundDetails>({
    queryKey: ["round", id],
    queryFn: () => fetchRound(id),
    enabled: !!id,
  });

  return { isLoadingRound: isPending, round: data, error };
};
