import joi from 'joi';

export const RegisterSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().required().trim().email(),
    phoneNumber: joi.string().required(),
    address: joi.string().required(),
    password: joi.string().required().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirm_Password : joi.string().valid(joi.ref('password')).required().label("confirm password").messages({"any.only": "{{#label}} does not match"}),  //
        
})
export const loginSchema = joi.object({
    email: joi.string().required().trim().email(),
    password: joi.string().required().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

})

export const option ={
    abortEarly : false,
    errors:{
        wrap:{
            label:''
        }
    }
}

export const CreateProductSchema = joi.object({
    productName: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required(),
})

export const UpdateProductSchema = joi.object({
    productName: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required(),
})

export const CreateTodoSchema = joi.object({
    description: joi.string().required(),
    completed: joi.boolean().required(),    
})

export const UpdateTodoSchema = joi.object({
    description: joi.string().required(),
    completed: joi.boolean().required(),    
})


