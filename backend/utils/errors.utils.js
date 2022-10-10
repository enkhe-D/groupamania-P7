module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo"))
    errors.pseudo = "Pseudo invalide ou déjà utilisé";

  if (err.message.includes("email"))
    errors.email = "Email invalide ou déjà utilisé";

  if (err.message.includes("password"))
    errors.password =
      "Mot de passe incorrecte, le mot de passe doit contenir minimum 6 caratères";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = "Pseudo déjà utilisé";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Email déjà utilisé";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email"))
    errors.email = "Email et/ou mot de passe incorrecte";

  if (err.message.includes("password"))
    errors.password = "Email et/ou mot de passe incorrecte";

  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };
  if (err.message.includes("Fichier invalide"))
    errors.format = "le format est incompatible";

  if (err.message.includes("max size"))
    errors.maxSize = "Le fichier dépasse 500ko";

  return errors;
};
