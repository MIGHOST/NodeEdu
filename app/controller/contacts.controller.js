const contacts = require("../../contacts");
const { v4: uuidv4 } = require("uuid");
const {
  creatContactValidation,
  updateContactValidation,
} = require("../validation/contacts.validation");

exports.getContacts = (req, res, next) => {
  const gettingContacts = contacts.listContacts();
  return res.status(200).send(gettingContacts);
};

exports.getContactById = (req, res) => {
  const id = parseInt(req.params.contactId);

  const contactWithId = contacts.getContactById(id);
  if (!contactWithId) {
    return res.status(404).send({ message: "Not found" });
  }
  return res.status(200).send(contactWithId);
};

exports.creatContact = (req, res) => {
  const { name, email, phone } = req.body;
  const { error } = creatContactValidation.validate(name, email, phone);
  if (error) {
    res.status(400).send({ message: "missing required name field" });
  }
  const contact = { id: uuidv4(), name, email, phone };
  const createdContact = contacts.addContact(contact);
  return res.status(201).send(createdContact);
};

exports.removeContactById = (req, res) => {
  const id = parseInt(req.params.contactId);
  const removedContact = contacts.removeContact(id);
  if (!removedContact) {
    res.send(400).send({ message: "Not found" });
  }
  return res.status(200).send({ message: "contact deleted" });
};

exports.updateContact = (req, res)=> {
  const {id}= req.params;

  const targetContact = contacts.findIndex(contact=>contact.id === id);
  if(!targetContact){
    return res.status(400).send({ message: "missing fields" });
  }
  contacts[targetContact] = [
    ...contacts[targetContact],
    ...req.body
  ]
}