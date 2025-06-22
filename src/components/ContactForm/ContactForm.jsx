import { ErrorMessage, Field, Form, Formik } from "formik";
import { nanoid } from "nanoid";
import { useRef } from "react";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts } from "../../redux/contacts/contactsSlice";
import { addContacts } from "../../redux/contacts/contactsOps";
import toast from "react-hot-toast";

function ContactForm() {
  const nameId = useRef(nanoid());
  const numberId = useRef(nanoid());

  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleSubmit = async (contact, actions) => {
    const isDuplicate = contacts.some(
      (item) => item.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isDuplicate) {
      toast.error("Contact with this name already exists.");
      return;
    }

    await toast.promise(dispatch(addContacts({ ...contact })).unwrap(), {
      loading: "Adding contact...",
      success: "Contact added successfully!",
      error: "Failed to add contact. Try again.",
    });

    actions.resetForm();
  };

  const validateYupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "min length 2 chars")
      .max(50, "max length 50 chars ")
      .required("Name is required"),

    number: Yup.string()
      .required("Phone number is required")
      .min(7, "Phone number is too short")
      .max(20, "Phone number is too long")
      .matches(
        new RegExp("^\\+?[0-9](?:[0-9-]*[0-9])?$"),
        "Please enter correct phone number "
      ),
  });

  return (
    <Formik
      validationSchema={validateYupSchema}
      onSubmit={handleSubmit}
      initialValues={{ name: "", number: "" }}
    >
      <Form className={css.box}>
        <label className={css.label} htmlFor={nameId.current}>
          Name
        </label>
        <div className={css.fieldWrapper}>
          <Field
            className={css.input}
            id={nameId.current}
            type="text"
            name="name"
          />
          <ErrorMessage
            name="name"
            component="p"
            className={css.errorMessage}
          />
        </div>
        <label className={css.label} htmlFor={numberId.current}>
          Phone
        </label>

        <div className={css.fieldWrapper}>
          <Field
            className={css.input}
            id={numberId.current}
            type="tel"
            name="number"
          />
          <ErrorMessage
            name="number"
            component="p"
            className={css.errorMessage}
          />
        </div>

        <button className={css.buttonAdd} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}

export default ContactForm;
