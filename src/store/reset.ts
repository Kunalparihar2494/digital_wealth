type ResetFn = () => void;

const resetters = new Set<ResetFn>();

export const registerReset = (fn: ResetFn) => {
  resetters.add(fn);
};

export const resetAllStores = () => {
  resetters.forEach((reset) => reset());
};
