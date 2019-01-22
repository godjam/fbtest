const urls = {
  PROD: 'https://prod.winitout.com/api/',
  LOCAL: 'http://localhost:8080/api/',
  CIBLER: 'https://qa.winitout.com/api/',
}

export default class WIOService {

  constructor(endpoint) {
    this.baseUrl = urls[endpoint] || urls.PROD;
    this.sessionId = ~~(Math.random() * 2000);
    this.lastSku = null;
  }

  async init(places = 3, prixmin = 100, prixmax = 500) {
    let url = `${this.baseUrl}couch_sku/init/000/?sessionId=${this.sessionId}&places=${places}&pricemin=${prixmin}&pricemax=${prixmax}`;
    console.log(url)
    let response = await fetch(url);
    let res = await response.json();
    this.lastSku = res;
    return res;
  }

  async next(sku, likes) {
    let url = `${this.baseUrl}couch_sku/next/000/?sessionId=${this.sessionId}&sku=${sku}&likes=${likes}`;
    console.log(url)
    let response = await fetch(url);
    let res = await response.json();
    this.lastSku = res.next;
    return res;
  }

  async last() {
    let url = `${this.baseUrl}couch_sku/last/000/?sessionId=${this.sessionId}`;
    console.log(url)
    let response = await fetch(url);
    let res = await response.json();
    return res;
  }
}
