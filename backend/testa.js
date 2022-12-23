
const { createClient }=require('redis');

(async () => {
  const client = createClient({
      port:6379,
      host:'127.0.0.1',
      password:'570818'
  });


  client.on('error', (err) => console.log('Redis Client Error', err));
//   client.on('connect', (connect) => console.log('Redis Client connect', connect));
  await client.connect();

  const value = await client.set('name', '王浩3');
  await client.get('name');
console.log(value)
})();