const json = require('./instantkarma.json');

console.log(JSON.stringify(json.map(({data: post}) => ({
  is_self: post.is_self,
  domain: post.domain,
}))));
