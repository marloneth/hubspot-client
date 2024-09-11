import { fireEvent, render, screen } from "@testing-library/react";
import Table, { TableHeader } from "../src/components/Table/Table";
import { generateHubspotContacts } from "./dataGenerators/hubspotContact";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";

const contactHeaders: TableHeader[] = [
  { name: "firstname", text: "Nombre" },
  { name: "lastname", text: "Apellido" },
  { name: "email", text: "Correo electrónico" },
];

const handleEdit = jest.fn();
const handleDelete = jest.fn();

describe("Table", () => {
  let users: any[] = [];
  const usersCount = 10;

  beforeEach(() => {
    users = generateHubspotContacts(usersCount).map((user) => user.properties);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("when includeActions is not set", () => {
    test("renders just the table without actions", () => {
      // @ts-ignore
      render(<Table headers={contactHeaders} data={users} />);

      const tableElement = screen.getByRole("table");
      expect(tableElement).toBeInTheDocument();

      const tableHeaders = tableElement.querySelectorAll("th");
      expect(tableHeaders).toHaveLength(contactHeaders.length);
      tableHeaders.forEach((header, i) => {
        expect(header.textContent).toBe(contactHeaders[i].text);
      });

      const tableBody = tableElement.querySelector("tbody");
      const dataRows = tableBody?.querySelectorAll("tr");
      expect(dataRows).toHaveLength(usersCount);
      dataRows?.forEach((row, i) => {
        const rowCells = row.querySelectorAll("td");
        expect(rowCells).toHaveLength(contactHeaders.length);

        rowCells.forEach((cell, j) => {
          expect(cell.textContent).toBe(users[i][contactHeaders[j].name]);
        });
      });
    });
  });

  describe("when includeActions is set", () => {
    test("renders the table with actions", () => {
      // @ts-ignore
      render(<Table headers={contactHeaders} data={users} includeActions />);

      const tableElement = screen.getByRole("table");
      expect(tableElement).toBeInTheDocument();

      const tableHeaders = tableElement.querySelectorAll("th");
      expect(tableHeaders).toHaveLength(contactHeaders.length + 1);
      tableHeaders.forEach((header, i) => {
        if (i < tableHeaders.length - 1) {
          expect(header.textContent).toBe(contactHeaders[i].text);
        } else {
          expect(header.textContent).toBe("Acciones");
        }
      });

      const tableBody = tableElement.querySelector("tbody");
      const dataRows = tableBody?.querySelectorAll("tr");
      expect(dataRows).toHaveLength(usersCount);
      dataRows?.forEach((row, i) => {
        const rowCells = row.querySelectorAll("td");
        expect(rowCells).toHaveLength(contactHeaders.length + 1);

        rowCells.forEach((cell, j) => {
          if (j < tableHeaders.length - 1) {
            expect(cell.textContent).toBe(users[i][contactHeaders[j].name]);
          } else {
            const actionButtons = cell.querySelectorAll("button");
            expect(actionButtons).toHaveLength(2);
            expect(actionButtons[0].title).toBe("Editar");
            expect(actionButtons[1].title).toBe("Eliminar");
          }
        });
      });
    });

    describe("when edit button is clicked in a row", () => {
      test("should trigger the onEdit function", () => {
        render(
          // @ts-ignore
          <Table
            headers={contactHeaders}
            data={users}
            includeActions
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );

        const tableElement = screen.getByRole("table");
        const tableBody = tableElement.querySelector("tbody");
        const dataRows = tableBody?.querySelectorAll("tr")!;
        const buttonsCell = dataRows[0].querySelectorAll("button");
        const [editButton] = buttonsCell;

        fireEvent.click(editButton);
        expect(handleEdit).toHaveBeenCalledTimes(1);
      });
    });

    describe("when delete button is clicked in a row", () => {
      test("should trigger the onDelete function", () => {
        render(
          // @ts-ignore
          <Table
            headers={contactHeaders}
            data={users}
            includeActions
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );

        const tableElement = screen.getByRole("table");
        const tableBody = tableElement.querySelector("tbody");
        const dataRows = tableBody?.querySelectorAll("tr")!;
        const buttonsCell = dataRows[0].querySelectorAll("button");
        const [_, deleteButton] = buttonsCell;

        fireEvent.click(deleteButton);
        expect(handleDelete).toHaveBeenCalledTimes(1);
      });
    });
  });
});
