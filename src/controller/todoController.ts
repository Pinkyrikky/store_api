import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { CreateTodoSchema, UpdateTodoSchema, option } from "../utils/utils";
import { TodoInstance } from "../model/todoModel";

export const createTodo = async function (req: Request | any, res: Response) {
  try {
    const verified = req.user;
    const iduuid = uuidv4();

    //validation with joi
    const validateResult = CreateTodoSchema.validate(req.body, option);

    if (validateResult.error) {
      res.status(400).json({ Error: validateResult.error.details[0].message });
    }

    const totoRecord = await TodoInstance.create({
      id: iduuid,
      ...req.body,
      userId: verified.id,
    });
    return res.status(201).json({
      msg: "Todo created successfully",
      totoRecord,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit as number | undefined;
    const offset = req.query.offset as number | undefined;

    const getAllTodo = await TodoInstance.findAndCountAll({
      limit: limit,
      offset: offset,
    });
    return res.status(200).json({
      msg: "Todos succesffully fetched",
      count: getAllTodo.count,
      todo: getAllTodo.rows,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleTodo = async (req: Request, res: Response) => {
  try{
    const {id} = req.params;
    const getOneTodo = await TodoInstance.findOne({where:{id:id}});

    if(!getOneTodo){
      return res.status(400).json({
        error: "cannot find todo"
      })
    }

    return res.status(200).json({
      msg: 'The todo has been found',
      todo:getOneTodo,
    })
  }catch (error) {
    console.log(error);
  }
}

export const upDateTodo = async (req: Request, res: Response) => {
  try {
    //Extract parameter from the req.body

    const { description, completed } = req.body;

    const { id } = req.params;

    //VALIDATE WITH JOI
    const validateResult = UpdateTodoSchema.validate(req.body, option);

    if (validateResult.error) {
      res.status(400).json({ Error: validateResult.error.details[0].message });
    }

    const upDateTodo = await TodoInstance.findOne({ where: { id: id } });

    if(!upDateTodo){
      return res.status(400).json({
        error: "cannot find todo"
      })
    }

    const updateRecord = await  upDateTodo.update({description,completed});
    return res.status(200).json({
      msg:"todo has been updated successfully",
      upDateTodo
    })
  } catch (error) {
    console.log(error);
  }
};


export const deleteTodo = async(req:Request,res:Response)=>{
  try{
    const {id} = req.params;

    const record = await TodoInstance.findOne({where:{id: id}})
    if (!record) {
      return res.status(400).json({
        error:'The provided ID does not exist.'
      })
    }
    const deleteRecord = await record.destroy();
    res.status(200).json({
      message : 'Deleted Successfully',
      deleteRecord
    })
    
    // const foundItem=await TodoInstance.destroy({where:{id}});
  
   
  }catch (error) {
    console.log(error);
  }
}
