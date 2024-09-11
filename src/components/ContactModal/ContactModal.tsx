import { IoClose } from "react-icons/io5";
import "./ContactModal.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Contact } from "../ContactsView/ContactsView";
import { emailRegex, phoneRegex } from "../../utils/regex";

interface Props {
  contact?: Contact;
  onClose: () => void;
  onCreate: (data: any) => void;
  onEdit: (id: string, data: any) => void;
}

function ContactModal({ onClose, onCreate, onEdit, contact }: Props) {
  const [firstname, setFirstname] = useState(contact?.firstname || null);
  const [firstnameError, setFirstnameError] = useState("");
  const [lastname, setLastname] = useState(contact?.lastname || null);
  const [lastnameError, setLastnameError] = useState("");
  const [email, setEmail] = useState(contact?.email || null);
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState(contact?.phone || null);
  const [phoneError, setPhoneError] = useState("");

  const mode = !contact ? "create" : "edit";
  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      firstname,
      lastname,
      email,
      phone,
    };

    mode === "create"
      ? onCreate(formData)
      : onEdit(contact!.hs_object_id, formData);
  };

  useEffect(() => {
    if (firstname !== null)
      setFirstnameError(firstname ? "" : "Nombre es requerido");
    if (lastname !== null)
      setLastnameError(lastname ? "" : "Apellido es requerido");

    if (email !== null) {
      if (!email) {
        setEmailError("Correo electrónico es requerido");
      } else if (!emailRegex.test(email)) {
        setEmailError(
          "Correo electrónico no es válido. Ej: example@domain.com"
        );
      } else {
        setEmailError("");
      }
    }

    if (phone !== null) {
      if (!phone) {
        setPhoneError("Teléfono es requerido");
      } else if (!phoneRegex.test(phone)) {
        setPhoneError("Teléfono no es válido. Ej: +521234567890 ó 1234567890");
      } else {
        setPhoneError("");
      }
    }
  }, [firstname, lastname, email, phone]);

  return (
    <div className="modal-backdrop z-20">
      <div className="modal p-6">
        <div className="flex justify-between text-xl mb-4">
          <h3 className="">
            {mode === "create" ? "Crear contacto" : "Editar contacto"}
          </h3>
          <button className="p-0 bg-transparent" onClick={onClose}>
            <IoClose />
          </button>
        </div>
        <form className="flex flex-col contact-form" onSubmit={handleSave}>
          <div className="flex flex-col mb-2">
            <label
              htmlFor="contact-first-name-input"
              className="after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              Nombre
            </label>
            <input
              id="contact-first-name-input"
              className="border-2 outline-0 border-black rounded pl-2"
              type="text"
              value={firstname || ""}
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFirstname(e.target.value)
              }
            />
            {firstnameError && (
              <label className="text-xs text-red-600">{firstnameError}</label>
            )}
          </div>
          <div className="flex flex-col mb-2">
            <label
              htmlFor="contact-last-name-input"
              className="after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              Apellido
            </label>
            <input
              id="contact-last-name-input"
              className="border-2 outline-0 border-black rounded pl-2"
              type="text"
              value={lastname || ""}
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLastname(e.target.value)
              }
            />
            {lastnameError && (
              <label className="text-xs text-red-600">{lastnameError}</label>
            )}
          </div>
          <div className="flex flex-col mb-2">
            <label
              htmlFor="contact-email-input"
              className="after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              Correo electrónico
            </label>
            <input
              id="contact-email-input"
              className="border-2 outline-0 border-black rounded pl-2"
              type="text"
              value={email || ""}
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            {emailError && (
              <label className="text-xs text-red-600">{emailError}</label>
            )}
          </div>
          <div className="flex flex-col mb-2">
            <label
              htmlFor="contact-phone-input"
              className="after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              Teléfono
            </label>
            <input
              id="contact-phone-input"
              className="border-2 outline-0 border-black rounded pl-2"
              type="text"
              value={phone || ""}
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
            />
            {phoneError && (
              <label className="text-xs text-red-600">{phoneError}</label>
            )}
          </div>
          <button
            type="submit"
            disabled={
              !firstname ||
              !!firstnameError ||
              !lastname ||
              !!lastnameError ||
              !email ||
              !!emailError ||
              !phone ||
              !!phoneError
            }
            className="justify-self-end bg-orange-400 mt-4 w-24 ml-auto disabled:opacity-75"
          >
            {mode === "create" ? "Crear" : "Editar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactModal;
