import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => ({
        message: detail.message,
        path: detail.path,
      }));
      res.status(400).json({ errors });
    } else {
      next();
    }
  };
};

export default validateRequest;
