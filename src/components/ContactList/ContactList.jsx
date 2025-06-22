import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";

import css from "./ContactList.module.css";
import { selectFilteredContacts } from "../../redux/filters/selectors";

function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <div className={css.wrapper}>
      <ul>
        {filteredContacts.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
