import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import useAPI from "../../hooks/useAPI";
import PaginationTable, { TableHeader } from "../Table/Table";
import SearchBar from "../SearchBar/SearchBar";
import { API_URL } from "../../config/constants";
import ContactModal from "../ContactModal/ContactModal";
import { Store } from "react-notifications-component";

export interface Contact {
  createddate: string;
  email: string;
  firstname: string;
  hs_object_id: string;
  lastmodifieddate: string;
  lastname: string;
  phone: string;
}

const limit = 10;

function ContactsView() {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentContact, setCurrentContact] = useState<Contact>();
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const { data, isLoading, fetchData } = useAPI();

  const contactHeaders: TableHeader[] = [
    { name: "firstname", text: "Nombre" },
    { name: "lastname", text: "Apellido" },
    { name: "email", text: "Correo electrónico" },
  ];

  const responseData = (data as unknown as Contact[]) || [];

  const searchByEmail = (email: string) => {
    setEmail(email);
  };

  const deleteContact = async (contactToDelete: Contact) => {
    try {
      await fetchData(
        `${API_URL}/contacts/${contactToDelete.hs_object_id}`,
        "DELETE"
      );

      fetchData(`${API_URL}/contacts`, "GET", { email });
    } catch (error) {
      handleError(error as Error);
    }
  };

  const openModal = (mode: "create" | "edit") => {
    setModalMode(mode);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const createContact = async (data: any) => {
    try {
      await fetchData(`${API_URL}/contacts`, "POST", undefined, data);
      setShowModal(false);
      fetchData(`${API_URL}/contacts`, "GET", { email });
    } catch (error) {
      handleError(error as Error);
    }
  };

  const editContact = async (id: string, data: any) => {
    try {
      await fetchData(`${API_URL}/contacts/${id}`, "PATCH", undefined, data);
      setShowModal(false);
      fetchData(`${API_URL}/contacts`, "GET", { email });
    } catch (error) {
      handleError(error as Error);
    }
  };

  const handleError = (error: Error) => {
    Store.addNotification({
      title: "Error!",
      message: error.message,
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
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
              openModal("create");
            }}
          >
            <FaPlus className="mt-1 mr-1" /> Crear
          </button>
        </div>
        {isLoading && <p>Loading ...</p>}
        {!isLoading && responseData.length && (
          <PaginationTable
            headers={contactHeaders}
            data={responseData as unknown as Record<string, string | number>[]}
            onDelete={deleteContact}
            onEdit={(row) => {
              setCurrentContact(row);
              openModal("edit");
            }}
            includeActions
          />
        )}
      </div>
      {showModal && (
        <ContactModal
          mode={modalMode}
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
