import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import useAPI from "../../hooks/useAPI";
import Table, { TableHeader } from "../Table/Table";
import SearchBar from "../SearchBar/SearchBar";
import { API_URL } from "../../config/constants";
import ContactModal from "../ContactModal/ContactModal";
import { errorMessage, successMessage } from "../../utils/notifications";

export interface Contact {
  createddate: string;
  email: string;
  firstname: string;
  hs_object_id: string;
  lastmodifieddate: string;
  lastname: string;
  phone: string;
}

function ContactsView() {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentContact, setCurrentContact] = useState<Contact>();
  const { data, isLoading, fetchData } = useAPI();

  const contactHeaders: TableHeader[] = [
    { name: "firstname", text: "Nombre" },
    { name: "lastname", text: "Apellido" },
    { name: "email", text: "Correo electrónico" },
  ];

  const responseData = (data as unknown as { contacts: Contact[] }) || [];

  const searchByEmail = (email: string) => {
    setEmail(email);
  };

  const deleteContact = async (contactToDelete: Contact) => {
    try {
      await fetchData(
        `${API_URL}/contacts/${contactToDelete.hs_object_id}`,
        "DELETE"
      );
      successMessage("¡Éxito!", "Contacto eliminado satisfactoriamente");
      fetchData(`${API_URL}/contacts`, "GET", { email });
    } catch (error) {
      handleError(error as Error);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const createContact = async (data: any) => {
    try {
      await fetchData(`${API_URL}/contacts`, "POST", undefined, data);
      successMessage("¡Éxito!", "Contacto creado satisfactoriamente");
      setShowModal(false);
      fetchData(`${API_URL}/contacts`, "GET", { email });
    } catch (error) {
      handleError(error as Error);
    }
  };

  const editContact = async (id: string, data: any) => {
    try {
      await fetchData(`${API_URL}/contacts/${id}`, "PATCH", undefined, data);
      successMessage("¡Éxito!", "Contacto editado satisfactoriamente");
      setShowModal(false);
      fetchData(`${API_URL}/contacts`, "GET", { email });
    } catch (error) {
      handleError(error as Error);
    }
  };

  const handleError = (error: Error) => {
    errorMessage("¡Error!", error.message);
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        await fetchData(`${API_URL}/contacts`, "GET", { email });
      } catch (error) {
        handleError(error as Error);
      }
    };

    getContacts();
  }, [email]);

  return (
    <div className="w-screen py-10 px-28">
      <h1 className="text-center">Contactos de Hubspot</h1>
      <div>
        <div className="flex h-12 justify-between mb-6 mt-10 px-8">
          <SearchBar
            placeholder="Buscar por correo electrónico"
            onSearch={searchByEmail}
          />
          <button
            className="flex h-10 bg-orange-400 pt-2"
            onClick={() => {
              setCurrentContact(undefined);
              openModal();
            }}
          >
            <FaPlus className="mt-1 mr-1" /> Crear
          </button>
        </div>
        {isLoading && <p>Loading ...</p>}
        {!isLoading && responseData?.contacts?.length && (
          <Table
            headers={contactHeaders}
            data={
              responseData.contacts as unknown as Record<
                string,
                string | number
              >[]
            }
            onDelete={deleteContact}
            onEdit={(row) => {
              setCurrentContact(row);
              openModal();
            }}
            includeActions
          />
        )}
        {!isLoading && !responseData?.contacts?.length && <p>No results</p>}
      </div>
      {showModal && (
        <ContactModal
          contact={currentContact}
          onClose={closeModal}
          onCreate={createContact}
          onEdit={editContact}
        />
      )}
    </div>
  );
}

export default ContactsView;
