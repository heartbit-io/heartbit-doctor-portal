import { api } from ".";

export const getQuestion = async (index: number) => {
  try {
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    const res = await api.get(`doctors/questions?index=${index}`);
    return res?.data;
  } catch (err: any) {
    return err?.response;
  }
};

export const getQuestionDetails = async (questionId: number) => {
  try {
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    const res = await api.get(`doctors/questions/${questionId}`);
    return res?.data;
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
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const getAnswerDetails = async (questionId: string) => {
  try {
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    const res = await api.get(`/doctors/answered-questions/${questionId}`);
    return res?.data;
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
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const assignQuestion = async (data: any) => {
  try {
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    const res = await api.post(`/doctors/assign-question`, data);
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const cancelQuestion = async (data: any) => {
  try {
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    const res = await api.post(`/doctors/remove-question`, data);
    return res?.data;
  } catch (err) {
    return err;
  }
};
