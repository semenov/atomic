export default function temperatureApi(url) {
  return {
    getCurrentTemperature: _ => {
      return new Promise(resolve => {
        setTimeout(_ => {
          resolve(25);
        }, 1000);
      });;
    }
  };
}
