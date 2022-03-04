import { categories } from "../constants/categories";

export const parseData = (text) => {
  const rows = text.split("\n");
  const parsedData = rows.map((r) => {
    const rData = r.split(",");
    return {
      date: rData[0],
      description: rData[1],
      category: categories[rData[2]],
      value: Number(rData[3].replace("\r", "")),
    };
  });
  return parsedData;
};
