import styles from "./ListItem.module.css";
import { categoryIcons } from "../../constants/categories";

const ListItem = ({
  category,
  description,
  value,
  percentage,
  handleCategoryClick = () => {},
}) => (
  <div className={styles.listItem}>
    <div
      data-category={category}
      onClick={handleCategoryClick}
      className={styles.iconContainer}
    >
      <span>{categoryIcons[category]}</span>
    </div>
    <div className={styles.itemContent}>
      <div>
        <div
          data-category={category}
          onClick={handleCategoryClick}
          className={styles.category}
        >
          {category}
        </div>
        <div className={styles.description}>{description}</div>
      </div>
      <div>
        <div className={styles.value}>€ {value}</div>
        {percentage ? (
          <div className={styles.percentage}>{percentage}%</div>
        ) : null}
      </div>
    </div>
  </div>
);

export default ListItem;
