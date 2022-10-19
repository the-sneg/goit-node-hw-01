const argv = require("yargs").argv;
const contacts = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const data = await contacts.listContacts();
      console.table(data);
      break;

    case "get":
      const contact = await contacts.getContactById(id.toString());
      console.table(contact);
      break;

    case "add":
      const add = await contacts.addContact(name, email, phone);
      console.table(add);
      break;

    case "remove":
      const remove = await contacts.removeContact(id.toString());
      console.table(remove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
