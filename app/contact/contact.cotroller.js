const contactModel = require('./contact.model');
const {
  Types: { ObjectId },
} = require('mongoose');

class ContactController {
  async createContact(req, res) {
    try {
      const contact = await contactModel.create(req.body);
      if (!contact) {
        return res.status(400).send({ message: 'missing required name field' });
      }
      return res.status(201).send(contact);
    } catch (error) {
      res.status(500).send('Server error');
    }
  }
  async getContacts(req, res) {
    try {
      const { page, limit, sub } = req.query;
      if (page && limit) {
        const options = {
          page,
          limit
        };

        const contacts = await contactModel.paginate({}, options);

        return res.status(200).json(contacts.docs);
      }

      if (sub) {
        const options = {
          subscription: sub,
        };
        const contacts = await contactModel.find(options);

        return res.status(200).json(contacts);
      }
      const contacts = await contactModel.find({});
      if (!contacts) {
        return res.status(400).send({ message: 'Contacts not founded' });
      }
      return res.status(200).send(contacts);
    } catch (error) {
      res.status(500).send('Server error');
    }
  }
  async getContactById(req, res) {
    try {
      const contactId = req.params.contactId;
      if (!ObjectId.isValid(contactId)) {
        return res
          .status(404)
          .send({ message: `Contact with id - ${contactId} if not found` });
      }
      const contactWithId = await contactModel.findById(contactId);

      return res.status(200).send(contactWithId);
    } catch (error) {
      res.status(500).send('Server error');
    }
  }

  async updateContact(req, res) {
    try {
      if (!Object.keys(req.body).length) {
        return res.status(400).send({ message: 'missing fields' });
      }
      const contactId = req.params.contactId;
      const updateContact = await contactModel.findContactByIdAndUpdate(
        contactId,
        req.body,
      );
      if (!updateContact) {
        return res.send(400).send({ message: 'Not found' });
      }

      return res.status(200).send(updateContact);
    } catch (error) {
      res.status(500).send('Server error');
    }
  }

  async deleteContact(req, res) {
    try {
      const contactId = req.params.contactId;
      if (!ObjectId.isValid(contactId)) {
        return res.status(404).send({ message: `Not found` });
      }
      const deletedContact = await contactModel.findByIdAndDelete({
        _id: contactId,
      });
      if (!deletedContact) {
        return res.send(400).send({ message: 'Not found' });
      }
      return res
        .status(200)
        .send({ message: `contact ${deletedContact.name} deleted` });
    } catch (error) {
      res.status(500).send('Server error');
    }
  }
}
module.exports = new ContactController();
