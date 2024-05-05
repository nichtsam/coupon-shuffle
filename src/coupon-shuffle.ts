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

  let options = Object.keys(typeBuckets);

  if (combinations.length === 0 && minimunCombo.length !== 0) {
    combinations.push(minimunCombo);
  }

  console.dir({ coupons, combinations }, { depth: Infinity });
  return combinations;
}
