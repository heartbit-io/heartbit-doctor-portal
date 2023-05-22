import { api } from ".";

export const getQuestion = async (offset: number) => {
  try {
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    const res = await api.get("doctors/questions", { limit: 1, offset });
    console.log("GET QUESTION>>>>>>>>> ", res);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getQuestionDetails = async (questionId: number) => {
  try {
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    const res = await api.get(`doctors/questions/${questionId}`);
    console.log("GET QUESTION DETAILS>>>>>>>>> ", res);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getMyAnswers = async (offset: number) => {
  try {
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    const res = await api.get(
      `/doctors/answered-questions?limit=20&offset=${offset}`
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export const answer = async (data: any) => {
  try {
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    const res = await api.post(`/replies`, data);
    return res.data;
  } catch (err) {
    return err;
  }
};
