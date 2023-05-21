export default class IPLookup {
  constructor() {
    this.key = "7af186cb5b0740ea9b182108231405";
  }

  async requestIP() {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/ip.json?key=${this.key}&q=auto:ip`
      );
      const json = await response.json();
      this.city = json.city;
    } catch (err) {
      console.log(err);
    }
  }

  getCity() {
    // console.log("city:", this.city);
    return this.city;
  }
}
