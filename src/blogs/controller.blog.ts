import { NextFunction, Response } from "express";
import { ProtectedRequest } from "../auth";

export class BlogController{
    
    public async createBlog(request:ProtectedRequest, response:Response, next:NextFunction):Promise<void>{
        try {
            
            next()
        } catch (error) {
            next(error)
        }
    }
    public async editBlog(request:ProtectedRequest, response:Response, next:NextFunction):Promise<void>{
        try {

            next()
        } catch (error) {
            next(error)
        }
    }
    public async deleteBlog(request:ProtectedRequest, response:Response, next:NextFunction):Promise<void>{
        try {

            next()
        } catch (error) {
            next(error)
        }
    }
    public async getAllBlogs(request:ProtectedRequest, response:Response, next:NextFunction):Promise<void>{
        try {

            next()
        } catch (error) {
            next(error)
        }
    }
    public async createComment(request:ProtectedRequest, response:Response, next:NextFunction):Promise<void>{
        try {

            next()
        } catch (error) {
            next(error)
        }
    }
}