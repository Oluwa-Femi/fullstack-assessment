import axios from "axios";
import BASE_URL from "../utilsApi/baseUrl";

export const preAuthPostApi = async (url, body, tokens, headers) =>
  axios.post(`${BASE_URL}/${url}`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("_mt_")}`,
      ...headers
    }
  });

export const postApi = async (url, body, headers) =>
  axios.post(`${BASE_URL}/${url}`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("_mt_")}`,
      ...headers
    }
  });

export const putApi = async (url, body, headers) =>
  axios.put(`${BASE_URL}/${url}`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("_mt_")}`,
      ...headers
    }
  });

export const patchApi = async (url, body, headers) =>
  axios.patch(`${BASE_URL}/${url}`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("_mt_")}`,
      ...headers
    }
  });

export const getApi = async (url, params = {}, headers) =>
  axios.get(`${BASE_URL}/${url}`, {
    params: { ...params },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("_mt_")}`,
      ...headers
    }
  });

export const deleteApi = async (url, headers) =>
  axios.delete(`${BASE_URL}/${url}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("_mt_")}`,
      ...headers
    }
  });