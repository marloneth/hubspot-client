import { fireEvent, render, screen } from "@testing-library/react";
import ContactModal from "../src/components/ContactModal/ContactModal";
import { generateHubspotContact } from "./dataGenerators/hubspotContact";
import { Contact } from "../src/components/ContactsView/ContactsView";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";

const handleClose = jest.fn();
const handleCreate = jest.fn();
const handleEdit = jest.fn();

describe("ContactModal", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("when contact is not set", () => {
    test("should render an empty form", () => {
      render(
        // @ts-ignore
        <ContactModal
          onClose={handleClose}
          onCreate={handleCreate}
          onEdit={handleEdit}
        />
      );

      const title = screen.getByRole("heading");
      expect(title.textContent).toBe("Crear contacto");

      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input) => {
        expect(input).toHaveValue("");
      });

      const [_, saveButton] = screen.getAllByRole("button");
      expect(saveButton).toBeDisabled();
    });

    describe("when all fields are filled", () => {
      test("save button should be enabled", () => {
        render(
          // @ts-ignore
          <ContactModal
            onClose={handleClose}
            onCreate={handleCreate}
            onEdit={handleEdit}
          />
        );

        const inputs = screen.getAllByRole("textbox");
        const [firstnameInput, lastnameInput, emailInput, phoneInput] = inputs;
        fireEvent.change(firstnameInput, { target: { value: "test" } });
        fireEvent.change(lastnameInput, { target: { value: "test" } });
        fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
        fireEvent.change(phoneInput, { target: { value: "1234567890" } });

        const [_, saveButton] = screen.getAllByRole("button");
        expect(saveButton).not.toBeDisabled();
      });

      describe("when save button is clicked", () => {
        test("should trigger on create", () => {
          render(
            // @ts-ignore
            <ContactModal
              onClose={handleClose}
              onCreate={handleCreate}
              onEdit={handleEdit}
            />
          );

          const inputs = screen.getAllByRole("textbox");
          const [firstnameInput, lastnameInput, emailInput, phoneInput] =
            inputs;
          fireEvent.change(firstnameInput, { target: { value: "test" } });
          fireEvent.change(lastnameInput, { target: { value: "test" } });
          fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
          fireEvent.change(phoneInput, { target: { value: "1234567890" } });

          const [_, saveButton] = screen.getAllByRole("button");
          expect(saveButton).not.toBeDisabled();
          fireEvent.click(saveButton);
          expect(handleCreate).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe("when contact is set", () => {
    let contact: Contact;
    beforeEach(() => {
      contact = generateHubspotContact().properties;
    });

    test("should render a filled form", () => {
      render(
        // @ts-ignore
        <ContactModal
          contact={contact}
          onClose={handleClose}
          onCreate={handleCreate}
          onEdit={handleEdit}
        />
      );

      const title = screen.getByRole("heading");
      expect(title.textContent).toBe("Editar contacto");

      const inputs = screen.getAllByRole("textbox");
      const [firstnameInput, lastnameInput, emailInput, phoneInput] = inputs;
      expect(firstnameInput).toHaveValue(contact.firstname);
      expect(lastnameInput).toHaveValue(contact.lastname);
      expect(emailInput).toHaveValue(contact.email);
      expect(phoneInput).toHaveValue(contact.phone);

      const [_, saveButton] = screen.getAllByRole("button");
      expect(saveButton).not.toBeDisabled();
    });

    describe("when save button is clicked", () => {
      test("should trigger on edit", () => {
        render(
          // @ts-ignore
          <ContactModal
            contact={contact}
            onClose={handleClose}
            onCreate={handleCreate}
            onEdit={handleEdit}
          />
        );

        const inputs = screen.getAllByRole("textbox");
        const [firstnameInput, lastnameInput, emailInput, phoneInput] = inputs;
        fireEvent.change(firstnameInput, { target: { value: "test" } });
        fireEvent.change(lastnameInput, { target: { value: "test" } });
        fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
        fireEvent.change(phoneInput, { target: { value: "1234567890" } });

        const [_, saveButton] = screen.getAllByRole("button");
        expect(saveButton).not.toBeDisabled();
        fireEvent.click(saveButton);
        expect(handleEdit).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("when close button is clicked", () => {
    test("should trigger on edit", () => {
      render(
        // @ts-ignore
        <ContactModal
          onClose={handleClose}
          onCreate={handleCreate}
          onEdit={handleEdit}
        />
      );

      const [closeButton] = screen.getAllByRole("button");
      fireEvent.click(closeButton);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("when email is not correct", () => {
    test("save button should be disabled", () => {
      render(
        // @ts-ignore
        <ContactModal
          onClose={handleClose}
          onCreate={handleCreate}
          onEdit={handleEdit}
        />
      );

      const inputs = screen.getAllByRole("textbox");
      const [firstnameInput, lastnameInput, emailInput, phoneInput] = inputs;
      fireEvent.change(firstnameInput, { target: { value: "test" } });
      fireEvent.change(lastnameInput, { target: { value: "test" } });
      fireEvent.change(emailInput, { target: { value: "not-valid" } });
      fireEvent.change(phoneInput, { target: { value: "1234567890" } });

      const [_, saveButton] = screen.getAllByRole("button");
      expect(saveButton).toBeDisabled();
    });
  });

  describe("when phone is not correct", () => {
    test("save button should be disabled", () => {
      render(
        // @ts-ignore
        <ContactModal
          onClose={handleClose}
          onCreate={handleCreate}
          onEdit={handleEdit}
        />
      );

      const inputs = screen.getAllByRole("textbox");
      const [firstnameInput, lastnameInput, emailInput, phoneInput] = inputs;
      fireEvent.change(firstnameInput, { target: { value: "test" } });
      fireEvent.change(lastnameInput, { target: { value: "test" } });
      fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
      fireEvent.change(phoneInput, { target: { value: "12" } });

      const [_, saveButton] = screen.getAllByRole("button");
      expect(saveButton).toBeDisabled();
    });
  });
});
