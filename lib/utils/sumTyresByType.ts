type Tyre = {
  type: string;
  quantity: number;
};

const sumTyresByType = (allTyres?: any) => {
  if (!allTyres) return;
  const aggregatedTyres: { [key: string]: number } = {};

  allTyres.map((tyres: Tyre[]) => {
    tyres.map((tyre) => {
      const { type, quantity } = tyre;
      if (aggregatedTyres[type]) {
        aggregatedTyres[type] += quantity;
      } else {
        aggregatedTyres[type] = quantity;
      }
    });
  });

  return aggregatedTyres;
};

export default sumTyresByType;
