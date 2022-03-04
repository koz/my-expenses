export const filterByDate = (array, dateFilter, category) =>
  array.filter((i) => {
    const date = new Date(i.date);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (
      month === dateFilter[0] &&
      year === dateFilter[1] &&
      (!category || (category && i.category === category))
    ) {
      return true;
    }
    return false;
  });

export const groupByCategory = (data, sum) => {
  let dataByCategory = data.reduce((accum, { category, value }) => {
    if (!accum[category]) {
      accum[category] = {
        value,
        count: 1,
      };
    } else {
      accum[category].count += 1;
      accum[category].value += value;
    }

    return accum;
  }, {});

  dataByCategory = Object.keys(dataByCategory).reduce((accum, key) => {
    const category = dataByCategory[key];
    accum[key] = {
      ...category,
      percentage: (category.value / sum) * 100,
    };
    return accum;
  }, {});

  return dataByCategory;
};
