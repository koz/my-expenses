import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import styles from "./App.module.css";
import ListItem from "./components/ListItem";
import { fileTypes } from "./constants/files";
import { groupByCategory, filterByDate } from "./helpers/array";
import { parseData } from "./helpers/data";

function App() {
  const today = new Date();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dataByCategory, setDataByCategory] = useState({});
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [date, setDate] = useState([today.getMonth() + 1, today.getFullYear()]);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    if (!data.length) {
      return;
    }

    setDataByCategory(groupByCategory(filterByDate(data, date), sum));
    setFilteredData(filterByDate(data, date, categoryFilter));
  }, [data, date, categoryFilter, sum]);

  useEffect(() => {
    if (!filteredData.length) {
      return;
    }
    const sum = filteredData.reduce((accum, d) => accum + d.value, 0);
    setSum(sum);
  }, [filteredData]);

  const handleChange = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setData(parseData(text));
    };
    reader.readAsText(file);
  };

  const handleDateSelect = (e) => {
    const value = e.target.value.split("/").map((v) => Number(v));
    setDate(value);
  };

  const handleCategoryClick = (e) => {
    const value = e.target.getAttribute("data-category");
    if (value) {
      setCategoryFilter(value);
    }
  };

  return (
    <>
      <select
        defaultValue={`${date[0]}/${date[1]}`}
        onChange={handleDateSelect}
      >
        <option value="12/2021">December/21</option>
        <option value="1/2022">January/22</option>
        <option value="2/2022">February/22</option>
        <option value="3/2022">March/22</option>
      </select>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
        <p>Drop the file here</p>
      </FileUploader>
      {categoryFilter ? (
        <div>
          <button
            onClick={() => {
              setCategoryFilter(null);
            }}
            className={styles.categoryFilterButton}
          >
            Click here to clear filter
          </button>
        </div>
      ) : null}
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <p className={styles.sum}>€ {sum.toFixed(2)}</p>
          <ul className={styles.list}>
            {filteredData
              .sort((r1, r2) => r2.value - r1.value)
              .map((r) => (
                <li key={`${r.date}-${r.description}-${r.category}-${r.value}`}>
                  <ListItem
                    handleCategoryClick={handleCategoryClick}
                    category={r.category}
                    value={r.value}
                    description={r.description}
                  />
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.categoryList}>
          <p className={styles.categoryListTitle}>Expenses by category</p>
          <ul className={styles.list}>
            {Object.keys(dataByCategory)
              .sort(
                (keyA, keyB) =>
                  dataByCategory[keyB].value - dataByCategory[keyA].value
              )
              .map((key) => (
                <li key={key}>
                  <ListItem
                    handleCategoryClick={handleCategoryClick}
                    category={key}
                    description={`${dataByCategory[key].count} transactions`}
                    value={dataByCategory[key].value.toFixed(2)}
                    percentage={Math.round(dataByCategory[key].percentage)}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
