import { useDispatch } from "react-redux";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import css from "./PhonePage.module.css";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations";

export default function PhoneBookPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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
