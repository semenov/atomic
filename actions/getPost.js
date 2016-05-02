export default function getPost({params}, context) {
  return new Promise(resolve => {
    setTimeout(_ => {
        resolve(`Post ${params.id}`);
    }, 2000);
  });
}
