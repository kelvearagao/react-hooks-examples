const fn = n => (n <= 1 ? 1 : fn(n - 1) + fn(n - 2))

export const calcFibonacci = n => {
  const t0 = performance.now()
  const result = fn(n)
  const t1 = performance.now()

  console.log(
    "Call to doSomething took " + ((t1 - t0) / 1000).toFixed(2) + " seconds."
  )

  return result
}
