const redditResults = {
  a: [
    'a1',
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
  ],
  b: [
    'b1',
    'b2',
    'b3',
    'b4',
    'b5',
    'b6',
  ],
  c: [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
  ],
};


function* generator(results) {
  const reddits = Object.keys(results);

  // copy
  results = { ...results };

  for (const r of reddits) {
    results[r] = [...results[r]]
  }

  while (reddits.reduce((c, r) => c + results[r].length, 0) > 0) {
    for (const reddit of reddits) {
      if (results[reddit].length) {
        yield results[reddit].shift()
        break;
      }
    }

    reddits.push(reddits.shift());
  }
}


// test

const gen = generator(redditResults);

for (let i = 0; i < Object.keys(redditResults).reduce((c, r) => c + redditResults[r].length, 0); i++) {
  console.log(gen.next().value)
}

