export function getAllPossibleCouponCombinations<
  T extends { blockedTypes: Array<string> },
>(coupons: Array<T>): Array<Array<T>> {
  (function debug() {
    coupons = coupons.map((c, i) => {
      // @ts-ignore
      c.id = i;
      return c;
    });
  })();

  const alwaysCoupons: T[] = [];
  const typeBuckets = coupons.reduce<Record<string, T[]>>((buckets, coupon) => {
    if (coupon.blockedTypes.length === 0) {
      alwaysCoupons.push(coupon);
      return buckets;
    }

    for (const type of coupon.blockedTypes) {
      const bucket = buckets[type];
      if (!bucket) {
        buckets[type] = [coupon];
      } else {
        bucket.push(coupon);
      }
    }

    return buckets;
  }, {});

  const combinations: Array<Array<T>> = [];
  const minimunCombo = alwaysCoupons ?? [];

  const allBlockTypes = Object.keys(typeBuckets);

  function helper(options: string[], currentCombo: T[]) {
    // assuming options are all valid next choice

    if (options.length === 0) {
      // log({ options, currentCombo, combinations });
      // throw "";
      combinations.push(currentCombo);
      return;
    }

    for (const choice of options) {
      for (const coupon of typeBuckets[choice] ?? []) {
        const blockTypes = currentCombo.reduce((set, c) => {
          for (const t of c.blockedTypes) {
            set.add(t);
          }
          return set;
        }, new Set<string>());

        // check if new coupon conflict with current combo
        for (const t of coupon.blockedTypes) {
          if (blockTypes.has(t)) {
            combinations.push(currentCombo);
            return;
          }

          // feel free to add, since blockTypes is local and it returns once a block is encountered
          blockTypes.add(t);
        }

        const newCombo = [...currentCombo, coupon];

        const newOptions = allBlockTypes.filter((t) => !blockTypes.has(t));

        log({ currentCombo, coupon, newOptions, newCombo, blockTypes });
        helper(newOptions, newCombo);
      }
    }
  }

  try {
    helper(allBlockTypes, minimunCombo);
  } catch {}

  if (combinations.length === 0 && minimunCombo.length !== 0) {
    combinations.push(minimunCombo);
  }

  log({
    coupons,
    // @ts-ignore
    combinations: combinations.map((combo) => combo.map((c) => c.id).join(",")),
  });
  return combinations;
}

function log(item: any) {
  console.dir(item, { depth: Infinity });
}
