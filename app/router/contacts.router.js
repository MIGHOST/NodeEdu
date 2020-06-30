const express = require("express");
const contactRouter = express.Router();
const  {getContacts, getContactById, creatContact} = require("../controller/contacts.controller");

contactRouter.get("/", getContacts);
contactRouter.get("/:contactId", getContactById);
contactRouter.post("/", creatContact);
// contactRouter.delete("/:id", removeContactById);
// contactRouter.put("/", updateContact);


exports.contactRouter = contactRouter;
