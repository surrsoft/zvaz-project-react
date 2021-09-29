// [210423143800], rev.1 1.0.0 2021-04-23
export const stdArrElemsSwap = (arrBack: object[] | [], ix1: number, ix2: number) => {
  if (!arrBack) return
  if (arrBack.length < 1) return
  if (ix1 === ix2) return
  if (ix1 < 0 || ix2 < 0) return
  if (ix1 >= arrBack.length || ix2 >= arrBack.length) return
  // ---
  const a = arrBack[ix1]
  arrBack[ix1] = arrBack[ix2]
  arrBack[ix2] = a
}

// [210423161000], rev.1 1.0.0 2021-04-23
export const stdArrElemMove = (arrBack: object[] | [], ixFrom: number, ixTo: number) => {
  if (ixFrom === ixTo) return
  if (!arrBack || arrBack.length < 1) return
  if (ixFrom < 0 || ixTo < 0) return
  if (ixFrom >= arrBack.length) return
  if (ixTo >= arrBack.length) return
  // ---
  const el = arrBack.splice(ixFrom, 1)
  arrBack.splice(ixTo, 0, el[0])
}
