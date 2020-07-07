const {Router} = require('express');
const contactRouter = Router();
const ContactController = require('./contact.cotroller');

// contactRouter.get('/', ContactController.createContact);
// contactRouter.get('/:contactId', getContactById);
// contactRouter.post('/', ContactController.createContact);
// contactRouter.delete('/:contactId', removeContactById);
// contactRouter.patch('/:contactId', updateContact);

module.exports = contactRouter;
