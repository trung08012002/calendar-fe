export type Permutations<T extends string> = [T] extends [never]
  ? []
  : {
      [K in T]: [K, ...Permutations<Exclude<T, K>>];
    }[T];
