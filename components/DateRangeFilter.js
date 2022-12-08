import DateRangePicker from "react-native-daterange-picker-lz";
import { useTheme } from "@react-navigation/native";
import UserContext from "../context/UserContext";
import { useContext } from "react";

const DateRangeFilter = ({ close, handleFilter, state }) => {
  const { visibility, startDate, endDate, displayedDate, maxDate } = state;
  const { colors } = useTheme();
  const { setSpinner, setError, throwError } = useContext(UserContext);

  return (
    <DateRangePicker
      onChange={(obj) => {
        console.log(obj);
        handleFilter(obj)
        if (obj.endDate) {
          setSpinner(true);
          close(obj.endDate)
        } 
      }}
      endDate={endDate}
      startDate={startDate}
      displayedDate={displayedDate}
      maxDate={maxDate}
      open={visibility}
      containerStyle={{
        backgroundColor: colors.background,
        color: colors.text,
      }}
      headerTextStyle={{ color: colors.text }}
      dayTextStyle={{ color: colors.text }}
      selectedStyle={{ backgroundColor: colors.primary }}
      range
    />
  );
};

export default DateRangeFilter;
