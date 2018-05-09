export class User {

    uid: string;
    email: string;
    displayName: string;
    department?: string;
    isEdit?: boolean;
    isTrash?: boolean;
    themecolor?: string;

    constructor(user) {
        this.uid = user.uid;
        this.email = user.email;

        if(user.displayName){
            this.displayName = user.displayName;
        }else{
            this.displayName = "";
        }

        if(user.department){
            this.department = user.department;
        }else{
            this.department = "";
        }
        if(!user.isEdit){
            this.isEdit = false;
        }else{
            this.isEdit = user.isEdit;
        }
        if(!user.isTrash){
            this.isTrash = false;
        }else{
            this.isTrash = user.isTrash;
        }
        if(user.themecolor){
            this.themecolor = user.themecolor;
        }else{
            this.themecolor = "";
        }
    }
}  