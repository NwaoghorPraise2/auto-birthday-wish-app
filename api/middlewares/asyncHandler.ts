import { NextFunction } from "express"


interface funType {
    (req: Request, res:Response, next:NextFunction): Promise<any>
}

export default (fn: funType) => (req: Request, res:Response, next:NextFunction) => {
    fn(req, res, next).catch(next)
}