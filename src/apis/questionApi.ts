import { api } from ".";

export const getQuestion = async (offset: number) => {
  try {
    const res = await api.get("doctors/questions", { limit: 1, offset });
    console.log("GET QUESTION>>>>>>>>> ", res);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getQuestionDetails = async (questionId: number) => {
  try {
    const res = await api.get(`doctors/questions/${questionId}`);
    console.log("GET QUESTION DETAILS>>>>>>>>> ", res);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getMyAnswers = async (offset: number) => {
  try {
    const res = await api.get(`/doctors/answered-questions`);
    console.log("GET MY ANSWERS>>>>>>>>> ", res);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const answer = async (data: any) => {
  try {
    const res = await api.get(`/replies`, data);
    console.log("ANSWER >>>>>>>>> ", res);
    return res.data;
  } catch (err) {
    return err;
  }
};
