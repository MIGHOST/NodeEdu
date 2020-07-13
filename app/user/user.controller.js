const bcrypt = require('bcrypt');
const userModel = require('./user.model');
const sault = require('../../config');


class UserController {
  async createUser(req, res) {
    try {
      const hashPassword = await bcrypt.hash(req.body.password, sault);
      console.log(hashPassword)
      const US = {...req.body, password: hashPassword}
      res.json(US)
    //   const user = await userModel.create({ ...req.boy, subscription: 'free' });
    //   if (!user) {
    //     return res.status(400).send({ message: 'missing required name field' });
    //   }
    //   return res.status(201).send(user);
    } catch (error) {
      res.status(500).send('Server error');
    }
  }
  async getUsers(req, res) {
    try {
      const contacts = await userModel.find();
      if (!contacts) {
        return res.status(400).send({ message: 'User not founded' });
      }
      return res.status(200).send(user);
    } catch (error) {
      res.status(500).send('Server error');
    }
  }
  //   async getContactById(req, res) {
  //     try {
  //       const contactId = req.params.contactId;
  //       if (!ObjectId.isValid(contactId)) {
  //         return res
  //           .status(404)
  //           .send({ message: `Contact with id - ${contactId} if not found` });
  //       }
  //       const contactWithId = await contactModel.findById(contactId);

  //       return res.status(200).send(contactWithId);
  //     } catch (error) {
  //       res.status(500).send('Server error');
  //     }
  //   }

  //   async updateContact(req, res) {
  //     try {
  //       if (!Object.keys(req.body).length) {
  //         return res.status(400).send({ message: 'missing fields' });
  //       }
  //       const contactId = req.params.contactId;
  //       const updateContact = await contactModel.findContactByIdAndUpdate(
  //         contactId,
  //         req.body,
  //       );
  //       if (!updateContact) {
  //         return res.send(400).send({ message: 'Not found' });
  //       }

  //       return res.status(200).send(updateContact);
  //     } catch (error) {
  //       res.status(500).send('Server error');
  //     }
  //   }

  //   async deleteContact(req, res) {
  //     try {
  //       const contactId = req.params.contactId;
  //       if (!ObjectId.isValid(contactId)) {
  //         return res.status(404).send({ message: `Not found` });
  //       }
  //       const deletedContact = await contactModel.findByIdAndDelete({
  //         _id: contactId,
  //       });
  //       if (!deletedContact) {
  //         return res.send(400).send({ message: 'Not found' });
  //       }
  //       return res
  //         .status(200)
  //         .send({ message: `contact ${deletedContact.name} deleted` });
  //     } catch (error) {
  //       res.status(500).send('Server error');
  //     }
  //   }
}

module.exports = new UserController();
