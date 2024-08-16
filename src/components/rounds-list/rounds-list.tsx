import { FC } from "react";
import { useGetRounds } from "../../hooks/useGetRounds";
import { RoundItem } from "../round-item";
import "./styles.scss";

export const RoundsList: FC = () => {
  const { rounds, isLoadingRounds } = useGetRounds();

  if (isLoadingRounds) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="rounds-list">
      <div className="rounds-list-header">
        <div className="rounds-list-header__item">Rounds</div>
        <div className="rounds-list-header__item">Date</div>
      </div>

      <div>
        {rounds?.map((round) => (
          <RoundItem
            key={round.roundId}
            date={round.dateTime}
            id={Number(round.roundId)}
          />
        ))}
      </div>
    </div>
  );
};
