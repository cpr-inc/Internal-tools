export const ThemeColors: ThemeColor[]=[
    { classname: 'red', colorname: 'Red', active: false},
    { classname: 'pink', colorname: 'Pink', active: false},
    { classname: 'purple', colorname: 'Purple', active: false},
    { classname: 'deep-purple', colorname: 'Deep Purple', active: false},
    { classname: 'indigo', colorname: 'Indigo', active: false},
    { classname: 'blue', colorname: 'Blue', active: true},
  ]

export interface ThemeColor{
    classname: string;
    colorname: string;
    active: boolean;
}