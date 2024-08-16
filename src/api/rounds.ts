import axios from "./index";

export const fetchRounds = async () => {
  try {
    const rounds = await axios.get("/rounds");
    return rounds.data;
  } catch (error) {
    alert("Something went wrong. Try again later!");
  }
};

export const fetchRound = async (id: number | null) => {
  if (!id) return;

  try {
    const round = await axios.get(`/round/${id}`);
    return round.data;
  } catch (error) {
    alert("Something went wrong. Try again later!");
  }
};
