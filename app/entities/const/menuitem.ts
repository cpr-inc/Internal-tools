
export class Menuitem {
    name: string
    icon: string
    view: boolean
    constructor(values){
        this.name = values.name;
        this.icon = values.icon;
        this.view = values.view;
    }
}
