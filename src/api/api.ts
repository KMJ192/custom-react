export const serverAddr = 'http://localhost:3001';

const ajax = new XMLHttpRequest();

function api(method: string, url: string): Promise<any> | null {
  if (!ajax) {
    console.error('confirm ajax instanse');
    return null;
  }

  return new Promise((res, rej) => {
    ajax.open(method, url, true);
    ajax.onload = () => {
      if (ajax.status >= 200 && ajax.status < 300) {
        const { response } = ajax;
        try {
          const json = JSON.parse(ajax.response);
          res(json);
        } catch {
          res(response);
        }
      } else {
        rej(ajax.statusText);
      }
    };
    ajax.onerror = () => rej(ajax.statusText);
    ajax.send();
  });
}

export default api;
