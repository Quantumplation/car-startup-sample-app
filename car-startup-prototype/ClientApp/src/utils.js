
export function modified(base, mods) {
  return Object.assign({}, base, mods);
}

export function delay(ms) {
  return new Promise(res => {
    setTimeout(res, ms);
  });
}