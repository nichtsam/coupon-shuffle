export function getAllPossibleCouponCombinations<
  T extends { blockedTypes: Array<string> },
>(coupons: Array<T>): Array<Array<T>> {
  // (function debug() {
  //   coupons = coupons.map((c, i) => {
  //     // @ts-ignore
  //     c.id = i;
  //     return c;
  //   });
  // })();

  const possibleCombinations = generateIndexCombinations(coupons.length).map(
    (arr) => arr.map((i) => coupons[i]!),
  );

  const validCombinations = possibleCombinations
    .filter(validateCombination)
    .sort((a, b) => b.length - a.length);

  const uniq = removeSubsets(validCombinations);

  return uniq;
}

function validateCombination<T extends { blockedTypes: Array<string> }>(
  coupons: Array<T>,
): boolean {
  const blockTypes: Record<string, boolean> = {};
  for (const coupon of coupons) {
    for (const t of coupon.blockedTypes) {
      if (blockTypes[t]) {
        return false;
      } else {
        blockTypes[t] = true;
      }
    }
  }
  return true;
}

function generateIndexCombinations(length: number) {
  const result: number[][] = [];

  function helper(startIndex: number, currentCombination: number[]) {
    if (currentCombination.length > 0) {
      result.push(currentCombination.slice());
    }

    for (let i = startIndex; i < length; i++) {
      currentCombination.push(i);
      helper(i + 1, currentCombination);
      currentCombination.pop();
    }
  }

  helper(0, []);

  return result;
}

function removeSubsets<T extends any>(arr: T[][]) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    let isSubset = false;
    for (let j = 0; j < arr.length; j++) {
      if (i !== j && isSubsetOf(arr[i]!, arr[j]!)) {
        isSubset = true;
        break;
      }
    }
    if (!isSubset) {
      result.push(arr[i]!);
    }
  }

  return result;
}

function isSubsetOf<T extends any>(subset: T[], superset: T[]) {
  return subset.every((elem) => superset.includes(elem));
}
