import DateRangePicker from "react-native-daterange-picker-lz";

const DateRangeFilter = ({ close, handleFilter, state }) => {
  const { visibility, startDate, endDate, displayedDate, maxDate } = state;

  return (
    <DateRangePicker
      onChange={(obj) => {
        handleFilter(obj);
        if (obj.endDate) setTimeout(() => close(), 400);
      }}
      endDate={endDate}
      startDate={startDate}
      displayedDate={displayedDate}
      maxDate={maxDate}
      open={visibility}
      range
    />
  );
};

export default DateRangeFilter;
