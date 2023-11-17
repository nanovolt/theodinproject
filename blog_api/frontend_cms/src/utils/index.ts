export function timeout(ms: number, { fail }: { fail: boolean }) {
  return new Promise((resolve, reject) => {
    if (fail) return window.setTimeout(reject, ms);
    return window.setTimeout(resolve, ms);
  });
}
