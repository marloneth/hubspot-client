import ContactsView from "./components/ContactsView/ContactsView";
import { ReactNotifications } from "react-notifications-component";

function App() {
  return (
    <>
      <ReactNotifications />
      <ContactsView />;
    </>
  );
}

export default App;
