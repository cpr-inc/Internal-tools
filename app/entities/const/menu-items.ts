import { Menuitem } from '../../entities/const/menuitem'

export const MenuItems : Array<Menuitem> = [
    new Menuitem({ name: 'ログイン', icon: 'beenhere', view: false}),
    new Menuitem({ name: '業務月報', icon: 'assignment', view: true}),
    new Menuitem({ name: '交通費精算', icon: 'train', view: false}),
    new Menuitem({ name: 'TODOリスト', icon: 'event_available', view: false}),
    new Menuitem({ name: 'ログアウト', icon: 'beenhere', view: false}),
    new Menuitem({ name: 'ユーザ一覧', icon: 'people', view: false}),
    // new Menuitem({ name: 'ドキュメント', icon: 'get_app', view: false}),
]
