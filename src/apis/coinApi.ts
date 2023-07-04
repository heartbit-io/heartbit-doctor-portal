import { api } from ".";

const url = "coin-exchange-rates/btc";

export const getBtcRates = async (customSatoshi: number = 1) => {
  try {
    const query: string = `?satoshi=${customSatoshi}`;

    const response = await api.get(url + query);

    return response.data;
  } catch (err: any) {
    return err.response.data.message;
  }
};
