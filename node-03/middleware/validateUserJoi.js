export function validateUserjoi(schema) {
  console.log("i am in bro");
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message,"gmhbj");
      return res.status(400).json({ errors });
    }
    next();
  };
}
