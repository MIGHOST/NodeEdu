const fs = require('fs');
const path = require('path');
const util = require('util');
const contactsPath = path.join(__dirname, 'db/contacts.json');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

exports.listContacts = () => {
  readFile(contactsPath, 'utf8', (err, content) => {
    if (err) throw err;
    console.log(content);
  });
};

exports.getContactById = async id => {
  const contactDb = await readFile(contactsPath, 'utf8');
  const contacts = JSON.parse(contactDb);
  const filterContact = contacts.find(contact => contact.id === id);
  return console.log(filterContact);
};

exports.removeContact = async id => {
  const contactDb = await readFile(contactsPath, 'utf8');
  const contacts = JSON.parse(contactDb);
  const remove = contacts.filter(contact => contact.id !== id);
  await writeFile(contactsPath, JSON.stringify(remove));
};

exports.addContact = async contact => {
  const contactDb = await readFile(contactsPath, 'utf8');
  const contacts = [...JSON.parse(contactDb), contact];
  return await writeFile(contactsPath, JSON.stringify(contacts));
};

exports.updateContact = async (id, body) => {
  const contacts = await readFile(contactsPath, 'utf8');
  const result = JSON.parse(contacts).map(contact =>
    contact.id === id ? { ...contact, ...body } : contact,
  );
  await writeFile(contactsPath, JSON.stringify(result));
  const contactDb = await readFile(contactsPath, 'utf8');
  const contactsUpdate = JSON.parse(contactDb);
  const filterContact = contactsUpdate.find(contact => contact.id === id);
  return console.log(filterContact);
};
