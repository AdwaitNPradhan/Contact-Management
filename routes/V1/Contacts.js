const { error5xx, error4xx } = require("../../Controllers/ErrResponse");
const { JWTPull } = require("../../Controllers/JWTPuller");
const Contact = require("../../Models/Contact");

exports.CreateContact = (req, res, next) => {
  let { cName, email, phone, cType } = req.body;
  let { sub: uid } = JWTPull(req);
  if (!uid || !cName || !email || !phone) {
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
