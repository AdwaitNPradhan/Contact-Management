const { error5xx, error4xx } = require("../../Controllers/ErrResponse");
const { JWTPull } = require("../../Controllers/JWTPuller");
const Contact = require("../../Models/Contact");
exports.GetContacts = (req, res, next) => {
  let { sub: uid } = JWTPull(req);
  if (!uid) {
    let error = error4xx("Get Contacts", "Missing UID Fields");
    console.error(error);
    res.status(400).send(error);
  } else {
    Contact.find(
      { "meta.createdBy": uid, "meta.deleted": false },
      { "meta.createdBy": 0, "meta.deleted": 0, __v: 0 }
    )
      .then((contacts) => {
        res.status(200).send(contacts);
      })
      .catch((err) => {
        let error = error5xx(
          err,
          "Get Contacts",
          "Failed to Contact Data base Servers"
        );
        console.error(error);
        res.status(500).send(error);
      });
  }
};
exports.GetContact = (req, res, next) => {
  let { sub: uid } = JWTPull(req);
  let cid = req.params.cid;
  if (!cid) {
    let error = error4xx("Get Contact", "Missing UID Fields");
    console.error(error);
    res.status(400).send(error);
  } else {
    Contact.findOne(
      { "meta.createdBy": uid, _id: cid, "meta.deleted": false },
      { "meta.createdBy": 0, "meta.deleted": 0, __v: 0 }
    )
      .then((contact) => {
        res.status(200).send(contact);
      })
      .catch((err) => {
        let error = error5xx(
          err,
          "Get Contact",
          "Failed to Contact Data base Servers"
        );
        console.error(error);
        res.status(500).send(error);
      });
  }
};
exports.CreateContact = (req, res, next) => {
  let { cName, email, phone, cType } = req.body;
  let { sub: uid } = JWTPull(req);
  if (!cName || !email || !phone) {
    let error = error4xx("Create Contacts", "Missing Required Fields");
    console.error(error);
    res.status(400).send(error);
  } else {
    let newContact = new Contact({
      meta: {
        createdBy: uid.trim(),
      },
      cName: cName.trim(),
      contact: {
        email: email.trim(),
        phone: phone.trim(),
      },
      cType: cType && cType.trim(),
    });
    newContact
      .save()
      .then((contact) => {
        res.status(201).send({ state: "OK" });
      })
      .catch((err) => {
        let error = error5xx(
          err,
          "Create Contact",
          "Failed to Contact Data base Servers"
        );
        console.error(error);
        res.status(500).send(error);
      });
  }
};
exports.UpdateContact = (req, res, next) => {
  let { sub: uid } = JWTPull(req);
  let cid = req.params.cid;
  let { key, value } = req.body;
  let updateQuery = {};
  switch (key) {
    case "cName":
      updateQuery = { cName: value };
      break;
    case "email":
      updateQuery = { contact: { email: value } };
      break;
    case "phone":
      updateQuery = { contact: { phone: value } };
      break;
    case "cType":
      updateQuery = { cType: value };
      break;
  }
  Contact.updateOne({ _id: cid, "meta.createdBy": uid }, { $set: updateQuery })
    .then((upd) => {
      res.status(200).send({ state: "OK" });
    })
    .catch((err) => {
      let error = error5xx(
        err,
        "Update Contact",
        "Failed to Contact Data base Servers"
      );
      console.error(error);
      res.status(500).send(error);
    });
};
exports.DeleteContact = (req, res, next) => {
  let { sub: uid } = JWTPull(req);
  let cid = req.params.cid;
  Contact.deleteOne({ _id: cid, "meta.createdBy": uid })
    .then((del) => {
      res.status(200).send({ state: "OK" });
    })
    .catch((err) => {
      let error = error5xx(
        err,
        "Update Contact",
        "Failed to Contact Data base Servers"
      );
      console.error(error);
      res.status(500).send(error);
    });
};
