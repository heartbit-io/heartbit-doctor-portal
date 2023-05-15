import { api } from ".";

export const getUser = async (email: string) => {
  try {
    const response = await api.get(`users/${email}`);
    return response.data;
  } catch (err: any) {
    return err;
  }
};
