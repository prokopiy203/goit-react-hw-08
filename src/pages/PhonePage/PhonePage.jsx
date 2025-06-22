import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import css from "./PhonePage.module.css";

export default function PhoneBookPage() {
  return (
    <div className={css.wrapper}>
      <title>Phone book</title>
      <ContactForm />
      <span>
        <SearchBox />
        <ContactList />
      </span>
    </div>
  );
}
