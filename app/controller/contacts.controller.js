// const Contact = require("./contact.model");
// const { v4: uuid } = require("uuid");
const contacts = require("../../contacts");
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
  // const { error } = creatContactValidation.validate({ name, email, phone });
  // if (error) {
  //   res.send(400).send({ message: "missing required name field" });
  // }
  const contact = {name, email, phone}
  const createdContact = contacts.addContact(contact);
  return res.status(201).send(createdContact);
};

// exports.removeContactById = (req, res) => {
//   const removedContact = Contact.removeContactById(req.params.id);
//   res.json(removedContact);
// };

// exports.updateContact = (req, res) => {
//   const { error } = updateContactValidation.validate(req.body);
//   if (error) {
//     res.send(400).send("Check your data");
//   }
//   const updateContact = Contact.updateContact(req.body);
//   if(!updateContact){
//       res.status(400).send("Contact not found")
//   }
//   res.json(updateContact);
// };
