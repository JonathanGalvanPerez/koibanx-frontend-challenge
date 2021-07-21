import axios from "axios";
import CommerceDataResponse from "../models/CommerceDataResponse.model";
import { API_BASE_URL } from "./../config";

export const getData = async (queryParams: any) => {
  try {
    let { data } = await axios.get<CommerceDataResponse>(API_BASE_URL, {
      params: queryParams,
    });
    data.data = data.data.map(data => {
      data.lastSale = new Date(data.lastSale).toLocaleDateString();
      data.active = data.active ? 'Activo' : 'No Activo';
      return data
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
