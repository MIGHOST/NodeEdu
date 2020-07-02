const express = require('express');
const contactRouter = express.Router();
const {
  getContacts,
  getContactById,
  creatContact,
  removeContactById,
  updateContact,
} = require('../controller/contacts.controller');

contactRouter.get('/', getContacts);
contactRouter.get('/:contactId', getContactById);
contactRouter.post('/', creatContact);
contactRouter.delete('/:contactId', removeContactById);
contactRouter.patch('/:contactId', updateContact);

exports.contactRouter = contactRouter;
