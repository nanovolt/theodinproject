import key from "./key";

export default class IPLookup {
  async requestIP() {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/ip.json?key=${key}&q=auto:ip`
      );
      const json = await response.json();
      this.city = json.city;
    } catch (err) {
      console.log(err);
    }
  }

  getCity() {
    return this.city;
  }
}
