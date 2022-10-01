import Joi from 'joi';

export const ClientValidation = Joi.object({
  clientId: Joi.string().min(2).max(20).required(),
  name: Joi.string().min(2).max(40).required().trim(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .trim()
    .required(),
  phoneNumber: Joi.string().empty('').empty(null),
  totalBill: Joi.number().integer()
})


export const AgencyValidation = Joi.object({
  agencyId: Joi.string().min(2).max(20).required(),
  name: Joi.string().min(2).max(40).required().trim(),
  address1: Joi.string().required(),
  address2: Joi.string(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  phoneNumber: Joi.number().empty('').empty(null),
  clients: Joi.array().items(ClientValidation)
})

export const ClientUpdateValidation =Joi.object({
  agencyObjectId:Joi.string().required(),
  clientObjectId:Joi.string().required(),
  client: ClientValidation
})

