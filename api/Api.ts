import { Api } from './types';

const api: Api = (function () {
  let serverAddr = '';

  async function useRequest(
    url: string,
    option: { [key: string]: any } = {},
  ): Promise<any> {
    const requestUrl = serverAddr ? `${serverAddr}${url}` : url;
    try {
      const response = await fetch(requestUrl, option);
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.warn(`http request error : ${e}`);
      return null;
    }
    return null;
  }

  function useGlobalUrl(url?: string) {
    serverAddr = url || '';
  }

  return {
    useRequest,
    useGlobalUrl,
  };
})();

export const { useRequest, useGlobalUrl } = api;
export default api;
