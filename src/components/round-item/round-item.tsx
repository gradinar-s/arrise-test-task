import { FC, useState } from "react";
import { formatTimestamp } from "../../helpers";
import { useGetRound } from "../../hooks/useGetRound";
import { Area } from "../area";
import "./styles.scss";

interface Props {
  id: number;
  date: number;
}

export const RoundItem: FC<Props> = ({ id, date }) => {
  const [selectedRoundId, setSelectedRoundId] = useState<number | null>(null);

  const { round, isLoadingRound } = useGetRound(selectedRoundId);

  return (
    <>
      <div className="round-item" onClick={() => setSelectedRoundId(id)}>
        <div className="round-item__id">{id}</div>
        <div className="round-item__date">{formatTimestamp(date)}</div>
      </div>

      {isLoadingRound && <div className="loader">Loading...</div>}

      {round && (
        <div className="area-wrapper">
          <Area items={round.items} />
        </div>
      )}
    </>
  );
};
