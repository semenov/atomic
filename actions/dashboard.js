export default async function dashboard(request, {temperatureApi}) {
  const currentTemperature = await temperatureApi.getCurrentTemperature();

  return `Current temperature: ${currentTemperature}`;
}
