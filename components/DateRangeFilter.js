import DateRangePicker from "react-native-daterange-picker-lz";
import { useTheme } from "@react-navigation/native";

const DateRangeFilter = ({ close, handleFilter, state }) => {
  const { visibility, startDate, endDate, displayedDate, maxDate } = state;
  const {colors}=useTheme()

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
      containerStyle={{backgroundColor:colors.primary,color:colors.text}}
      headerTextStyle={{color:colors.text}}
      dayTextStyle={{color:colors.text}}
      selectedStyle={{backgroundColor:colors.card}}
      range
    />
  );
};

export default DateRangeFilter;
