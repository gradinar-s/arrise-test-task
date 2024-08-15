import { FC } from "react";
import { RoundsList } from "./components";
import "./styles.scss";

const App: FC = () => {
  return (
    <div className="app-wrapper">
      <RoundsList />
    </div>
  );
};

export default App;
