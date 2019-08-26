function getData(url = ''): Promise<any[]> {
  // Default options are marked with *
  return fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer' // no-referrer, *client
  }).then(response => response.json()); // parses JSON response into native JavaScript objects
}

export const getQuote = ({ fromCurrency, toCurrency, amount }: any): any =>
  getData(
    `https://api.ofx.com/PublicSite.ApiService/OFX/spotrate/Individual/${fromCurrency.value}/${toCurrency.value}/${amount}?format=json`
  );
