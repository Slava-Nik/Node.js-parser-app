const getSortedUniqueValues = (values) => {
  const valuesMap = {};
  values.forEach((value) => {
    if (valuesMap[value]) {
      valuesMap[value] = valuesMap[value] + 1;
    } else {
      valuesMap[value] = 1;
    }
  });
  const uniqueValues = Object.keys(valuesMap);
  uniqueValues.sort((value1, value2) => {
    if (valuesMap[value1] < valuesMap[value2]) {
      return 1;
    } else if (valuesMap[value1] > valuesMap[value2]) {
      return -1;
    }
    return 0;
  });
  return uniqueValues;
};

module.exports = {
  getSortedUniqueValues,
};
