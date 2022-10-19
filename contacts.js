const fs = require("fs").promises;
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const dataString = await fs.readFile(contactsPath, "utf-8");
  const data = JSON.parse(dataString);
  return data;
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contact.id === contactId);
  return contact ? contact : null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  const deletedContact = allContacts[index];
  if (index !== -1) {
    allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  }
  return deletedContact ? deletedContact : null;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = {
    id: uuid.v4(),
    name,
    email,
    phone,
  };

  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
