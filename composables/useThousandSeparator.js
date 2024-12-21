export const useThousandSeparator = () => {
    /*千分位格式*/
    const thousandSeparator = (value, separator = ",") => {
      if (isNaN(value)) {
        return "0"; // 如果不是數字，返回提示
      }
      const number = parseFloat(value); // 將輸入值轉換為浮點數
      return number
        .toLocaleString("en-US", { useGrouping: true })
        .replace(/,/g, separator); // 替換分隔符
    };
  
    return {
      thousandSeparator,
    };
  };