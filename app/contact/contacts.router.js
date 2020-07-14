const { Router } = require('express');
const contactRouter = Router();
const ContactController = require('./contact.cotroller');
const { contactValidateMiddleware } = require('./contacts.validation');
const { tokenMiddleware } = require('../../middleware/auth.middleware');

contactRouter.post(
  '/',
  tokenMiddleware,
  contactValidateMiddleware,
  ContactController.createContact,
);
contactRouter.get('/', tokenMiddleware, ContactController.getContacts);
contactRouter.get(
  '/:contactId',
  tokenMiddleware,
  ContactController.getContactById,
);
contactRouter.delete(
  '/:contactId',
  tokenMiddleware,
  ContactController.deleteContact,
);
contactRouter.patch(
  '/:contactId',
  tokenMiddleware,
  ContactController.updateContact,
);

module.exports = contactRouter;
