import { useDispatch } from "react-redux";
import css from "./Contact.module.css";
import {
  deleteContacts,
  updateContacts,
} from "../../redux/contacts/contactsOps";
import Swal from "sweetalert2";
import { VscEdit, VscTrash } from "react-icons/vsc";

function Contact({ contact }) {
  const dispatch = useDispatch();

  const handleUpdate = async (contact) => {
    const { value: formValues } = await Swal.fire({
      title: "Update contact",
      html:
        `<input id="swal-name" class="swal2-input" placeholder="Name" value="${contact.name}">` +
        `<input id="swal-number" class="swal2-input" placeholder="Number" value="${contact.number}">`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const name = document.getElementById("swal-name").value.trim();
        const number = document.getElementById("swal-number").value.trim();

        if (!name || !number) {
          Swal.showValidationMessage("Please enter both name and number");
          return null;
        }

        return { name, number };
      },
    });

    if (formValues) {
      try {
        await dispatch(
          updateContacts({ id: contact.id, updateData: formValues })
        ).unwrap();

        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Contact has been updated successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update contact. Please try again.",
        });
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this contact?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteContacts(id)).unwrap();
        Swal.fire({
          title: "Deleted!",
          text: "The contact has been deleted.",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the contact. Please try again.",
          icon: "error",
        });
      }
    }
  };

  return (
    <li className={css.box}>
      <span className={css.wrapper}>
        <p>{contact.name}</p>
        <a href={`tel:${contact.number}`}>{contact.number}</a>
      </span>
      <div className={css.boxButton}>
        <button className={css.update} onClick={() => handleUpdate(contact)}>
          <VscEdit size={30} />
        </button>
        <button className={css.delete} onClick={() => handleDelete(contact.id)}>
          <VscTrash size={30} />
        </button>
      </div>
    </li>
  );
}

export default Contact;
