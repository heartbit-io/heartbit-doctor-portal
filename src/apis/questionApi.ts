import { api } from ".";

export const getQuestion = async () => {
  try {
    const res = await api.get("doctors/questions", { limit: 1, offset: 1 });
    return res.data;
  } catch (err) {
    return err;
  }
};
