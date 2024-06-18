import { User } from "./model.user";

export class UserService {
    private userModel = User

    create(fullName:string, email:string, gender:string, password:string, role:string, avatar:string){}
    update(fullName:string, email:string, gender:string, password:string, role:string, avatar:string){}

    uploadImage(){}
    delete(id:string){}
}