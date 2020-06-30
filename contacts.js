const fs = require("fs");
const path = require("path");
const util = require("util");
const contactsPath = path.join(__dirname, "db/contacts.json");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

exports.listContacts = () => {
  readFile(contactsPath, "utf8", (err, content) => {
    if (err) throw err;
    console.log(content);
  });
};


exports.getContactById = async (id) => {
  const contactDb = await readFile(contactsPath, "utf8");
  const contacts = JSON.parse(contactDb);
  const filterContact = contacts.find((contact) => contact.id === id);
  return console.log(filterContact);
};

exports.removeContact = async (id) => {
  const contactDb = await readFile(contactsPath, "utf8");
  const contacts = JSON.parse(contactDb);
  const remove = contacts.filter((contact) => contact.id !== id);
  await writeFile(contactsPath, JSON.stringify(remove));

};

exports.addContact = async (name, email, phone) => {
  const contactDb = await readFile(contactsPath, "utf8");
  const contacts = JSON.parse(contactDb);
  const id = contacts[contacts.length - 1].id + 1;
  const newContact = {
    id: id,
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  return await writeFile(contactsPath, JSON.stringify(contacts));
};
