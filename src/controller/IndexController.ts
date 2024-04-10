import express,  {Request, Response, NextFunction} from "express"

const IndexController = async function(req:Request, res:Response, next:NextFunction) {
    res.render ('index', {title: 'Express'});
}

export default IndexController;