import { FC, Fragment, useState } from "react";
import { RoundDetails } from "../../hooks/useGetRound";
import { fetchRound } from "../../api/rounds";
import { formatTimestamp } from "../../helpers";
import { Area } from "../area";
import { useGetRounds } from "../../hooks/useGetRounds";
import "./styles.scss";

export const RoundsList: FC = () => {
  const [isLoadingRound, setLoadingRouns] = useState<Set<number>>(new Set());
  const [selectedRounds, setSelectedRounds] = useState<RoundDetails[]>([]);

  const { rounds, isLoadingRounds } = useGetRounds();

  const getRound = async (id: number) => {
    try {
      setLoadingRouns((previous) => new Set(previous).add(id));
      const round = await fetchRound(id);

      if (selectedRounds.every((i) => i.id !== round.id)) {
        setSelectedRounds((previous) => {
          const exists = previous.some((r) => r.id === round.id);
          if (!exists) {
            return [...previous, round];
          }
          return previous;
        });
      }
    } catch (error) {
    } finally {
      setLoadingRouns((previous) => {
        const newSet = new Set(previous);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  if (isLoadingRounds) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="rounds-list">
      <div className="rounds-list-header">
        <div className="rounds-list-header__item">Rounds</div>
        <div className="rounds-list-header__item">Date</div>
      </div>

      <div className="rounds-list-body">
        {rounds?.map((round) => (
          <Fragment key={round.roundId}>
            <div
              className="rounds-list-body__round"
              onClick={() => getRound(Number(round.roundId))}
            >
              <div className="rounds-list-body__round_id">{round.roundId}</div>
              <div className="rounds-list-body__round_date">
                {formatTimestamp(round.dateTime)}
              </div>
            </div>

            {isLoadingRound.has(Number(round.roundId)) && (
              <div className="loader">Loading...</div>
            )}

            {selectedRounds.map((r) => {
              if (r.id === round.roundId) {
                return (
                  <div className="area-wrapper" key={r.id}>
                    <Area items={r.items} />
                  </div>
                );
              }
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
