const { Router } = require('express');
const contactRouter = Router();
const ContactController = require('./contact.cotroller');
const { contactValidateMiddleware } = require('./contacts.validation');

contactRouter.post( '/', contactValidateMiddleware,ContactController.createContact,
);
contactRouter.get('/', ContactController.getContacts);
contactRouter.get('/:contactId', ContactController.getContactById);
contactRouter.delete('/:contactId', ContactController.deleteContact);
contactRouter.patch('/:contactId', ContactController.updateContact);

module.exports = contactRouter;
