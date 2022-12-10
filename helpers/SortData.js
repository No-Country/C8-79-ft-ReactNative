export const sortData = (arr) => {
    const sortedArray = arr.sort(function (a, b) {
      if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
        return -1;
      }
      if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    return sortedArray;
  };