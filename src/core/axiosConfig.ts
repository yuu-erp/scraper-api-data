import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import Proxy from './Proxy';
import { RequireAtLeastOne } from 'src/types/utils';
import axiosRetry from 'axios-retry';
import logger from 'src/lib/logger';
import { errorLogger } from 'axios-logger';

export default class AxiosConfig {
  client: AxiosInstance;
  proxy: Proxy;
  baseURL: string;

  constructor(axiosConfig?: RequireAtLeastOne<AxiosRequestConfig, 'baseURL'>) {
    const config = {
      headers: {
        referer: axiosConfig.baseURL,
        origin: axiosConfig.baseURL,
      },
      timeout: 20000,
      ...axiosConfig,
    };
    this.client = axios.create(config);
    this.baseURL = axiosConfig.baseURL;

    this.proxy = new Proxy({
      referer: axiosConfig.baseURL,
      origin: axiosConfig.baseURL,
    });

    axiosRetry(this.client, { retries: 3 });

    const axiosErrorLogger = (error: AxiosError) => {
      return errorLogger(error, {
        logger: logger.error.bind(logger),
      });
    };

    this.client.interceptors.request.use((config) => config, axiosErrorLogger);

    this.client.interceptors.response.use(
      (response) => response,
      axiosErrorLogger,
    );
  }
}
