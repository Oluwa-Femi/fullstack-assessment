import axios from 'axios';
import config from '../config/index';

class RequestHelper {
  static async request({
    url,
    method,
    headers,
    data,
  } : {
    url: string;
    method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
    headers?: { [key: string]: string };
    data?: { [key: string]: string };
  }) {
    const response = await axios.request({
      url: url,
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'mono-sec-key': config.mono.secretKey,
        ...headers,
      },
      data: {
        ...data,
      },
    });

    return response;
  }
}

export default RequestHelper;
