export function countPlays(plays) {
  return plays.reduce((cVal, { itemId, playbackDuration }) => {
    if (playbackDuration === 0) return cVal;
    cVal[itemId] ? (cVal[itemId] += 1) : (cVal[itemId] = 1);
    return cVal;
  }, {});
}

export function topListens(plays, num = 5) {
  const res = [];
  for (const key in plays) {
    res.push([key, plays[key]]);
  }
  return res.sort((a, b) => b[1] - a[1]).slice(0, num);
}
