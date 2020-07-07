const contactModel = require('./contact.model');

class ContactController {
  async createContact(req, res, next) {
    try {
      const contact = await contactModel.create(req.body);
      return res.status(contact);
    } catch (error) {
      res.status(400).send({ message: 'missing required name field' });
    }
  }
}
module.exports = new ContactController()