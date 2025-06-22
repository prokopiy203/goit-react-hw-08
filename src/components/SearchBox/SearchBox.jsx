import { useDispatch, useSelector } from "react-redux";
import css from "./SearchBox.module.css";
import {
  changeFilter,
  selectNameFilter,
} from "../../redux/contacts/filtersSlice";

function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleTextSearch = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.inputBox}>
      <input
        value={filter}
        onChange={handleTextSearch}
        className={css.input}
        type="text"
        placeholder="Please write text"
      />
    </div>
  );
}

export default SearchBox;
