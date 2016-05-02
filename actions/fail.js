import Response from '../response';
export default function fail({params}, context) {
  return new Promise(resolve => {
    setTimeout(_ => {
      const result = new Response(500, 'Some error happened');
      
      resolve(result);
    }, 2000);
  });
}
