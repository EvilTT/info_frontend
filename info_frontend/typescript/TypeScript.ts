// TODO ------------------------------Базовые типы------------------------------
//! boolean - логические false/true
const bool: boolean = true
//! number - числа 
const num: number = 2
//! symbol, bigint
const m: bigint = BigInt(2)
const ss: symbol = Symbol('2') 
//! string - строка/шаблонная строка `${}`
const str: string = 'Maxim'
const str2: string = `Maxim age ${21}`
//! null/undefined - null/undefined
const b: null = null
const c: undefined = undefined
//! void - отсутствующий тип (функция ничего не возвращает и т.п)
const func = (): void => {}
//! any - любой тип 
const d: any = 22
const d1: any = 'str'
//! литеральные типы
let n: 'Max' | 'John' = 'Max' //* Может быть только тем литералом который объявлен, удобно использовать с перичеслениями 
//! enum (перечисления) - позволяют определить набор именовыных констант. Доступ как в объекте, name.name. или nameEnum[] Первый элемент по умолчанию верент 0, если не переопределн. При переопределении возвращает присвоеное значение, следующий оператор (если указан) вернет предыдущее увеличеное на 1 если тот не переопределен.
//! enum можно использовать как тип, поле использующее enum как тип долно быть равно ондому из его возможных значений 
//* Компилируется в IIFE, если добавить перед enum const, то либо не во что либо в массив []
enum Language {
    JS ,
    TS = 2,
    Java 
}
Language.JS //* 0
Language.TS //* 2
Language[2] //* "TS"
type UK = {
    exp: Language //? Используем enum как тип, exp должен быть равен одному из возможных значений enum
}
//! never - указывается, когда функция возвращает ошибка или посноянно выполняется
const func1 = (): never => { throw new Error() } 
//! unknown - присваивает любое значение как и any, но мы не сможем его использовать(обращатьсся к полям класса, вызывать функции и т.д) без удтверждения типа. 
let a2 = 's'
a2 as const

// rr.toLowerCase()
//! object - указывает объект или не примитив 
const obj: object = {num: 2}
const noPrimitive: object = []

//TODO-----------------------------------Опции--------------------------------------------------- 
//! Тип объединения - обозначается "|", указывает на принадлежность к одному из 2 типов
let a: number | string = 2 
let a1: number | string = '2'

//! Опциональный аргумент "?:" - не обязательный параметр, может быть а может и не быть
const f = (tyme: Date, data?: number) => {} //* при вызове без дата не будет ошибки т.к data опциональный аргумент

//! keyof - преобразует ключи type, interface, enum, class в union type
//! С классами преобразует только public и не static ключи
type Worker = {
    name: string,
    id: number
}
type WebWorker = keyof Worker //* "name" | "id"
let worker: WebWorker = 'name'

//! typeof при использовании с типами возвращает тип структуры после него
const project = {
    id: 2,
    title: 'React'
}
type MyProject = typeof project 
const myProject: MyProject = {
    id: 1,
    title: ''
}
//* совместное использование typeof и keyof

type UserSchema = {
    [key in keyof typeof project]: string //? ключи будут ключами project а их типы string
}

//! Удтверждени типа, используется ключевое слово 'as'. Они используются когда вы хотите указать тип конкретнее чем коомпилятор понимает сам. Для более строго удтверждения используем двойное, сначала с any|unknown затем тип
const clicker = (event: Event) => {
    const mouseEvent = event as MouseEvent
} 
//* Двойное (показан синтаксис а не пример использования!!!)
const y = (Map as any) as string

//! Константное удтверждение - as const.  
let fruit = 'Banana' as const //* превращает fruit в строковый литерал
const user = {
    name: 'John',
    role: 'admin'
} as const; 
//* as const с объектами превращает его в имутабельную сущность добавляя readonly к полям
const userConst: {
    readonly name: 'John',
    readonly role: 'admin'
}
//* с массивами делает кортежи
 
//! Оператор keyof - превращает ключи объектов|interface в union тип (возможеный для перебора) 
type Q = {
    name: string,
    age: 10,             //* typeof Q = "name" | "age" | "private"
    private: boolean  
} 

//! Преобразование опциональных полей, синтаксис -?: делает опциональное поел обязательным

type Reset = {
    name?: string,
    age?: number
}
type ChangeFiled<O> = {
     [K in keyof O]-?: O[K]
}

type Converted = ChangeFiled<Reset>

//TODO-----------------------------------Массивы--------------------------------------------------- 
//! массивы - TYPE[] или Array<TYPE>, пример number[] - [1,2,3] | Array<number> аналогичен предыдущему. Tuple [string, number] - массив определенной длины и типов
const arr: [] = []
const arrNum: number[] = [1,2,3]
const arrNum1: Array<number> = [1,2,3]
//* Только для установленной длины, тут 2 элемента
const arrAny: [string, number] = ['Max', 21] 

//TODO-----------------------------------Объекты--------------------------------------------------- 
//! type - нужен для создания пользовательских типов, аналог interface, ситаксис type Name = {}
type User = {
    name: string,
    age?: number
} 
const obj1: User = {
    name: 'Max'
}
//! типизация с помощью литерала объекта, НЕ ИСПОЛЬЗОВАТЬ!!! 
const r = ( g:{x: string, y: string}):void => {g} //* описания типа объекта в аргументе функции
//! Индексируемые поля - [name: string]: User - это значит что это поле имеет ключ тип String и значения типа User
type Proger = {
    [language: string]: string | number,
} 
//! type можно расширять
type Persons = User & Proger

//TODO ----------------------------------Классы------------------------------------------------------- 
//! для описания типов полей класса до constructor описываем их, что бы задать default значения присваиваем его
class Person{
    name: string = 'Max' //* "Max" - default value
    constructor(name:string){
        this.name = name
    }
} 
class Person1{
    constructor(
        private name: string //* Сокращенный 1 вариант, но для всех свойств нужно обязательно указывать модефикатор
    ){}
}
//! директивы для управления доступностями полей класса: public - default, если не указано ставиться оно, private - не доступен за пределами класса, readonly - поле только для чтения, protected - доступ получают только через наследование
//! private поля можно изменять с помощью сеттеров (set) или методов которые пользуються этими полями 
class Directives{
    constructor(
        public name: string,
        protected age: number,
        private type: boolean,
        readonly cName: string
    ){}

    changeType(type: boolean):void {
        this.type = type
    }

    set setType(type: boolean) {
        this.type = type
    }
}
//! abstract - ключеное слово для создания асбтрактных классов, от них нельзя создавать instance только наследоваться, абстрактные методы должны быть реализованны в наследуемых классах так, как описанны в абстрактном
abstract class Max{
    abstract getPass():string
}
//! 
//! 
//! 
// TODO ------------------------------Interface------------------------------
//! Интерфейсы используются для классов они описывают его структуру, поля не указанные в интерфейсе могут быть в отличие от type, где строго определенное кол-во свойств 
interface I{
    name: string
}
//! Описание методов в interface
interface Fuc{
    getAcces: (a: string) => I
} 
//! interface расширяемые, могут наследовать друг от друга, interfase extends interface{name: string}
interface F extends I, Fuc{
    is: boolean
} 
//! Что бы применить интерфасе к классу используется ключевое слово implement
class As implements F{
    name: string
    is: boolean
    getAcces: (a: string) => I;

    constructor(){}
} 
//! К полям interface или type можно ображаться через ["key"] для использования его полей как типов
interface TypeOfEngine{
    state: 'a' | 'b' | 'c'
}
const engine: TypeOfEngine['state'] = 'a'

enum OilPrice{
    MAX = '200$',
    MIN = '100$'
}
type Oil = {
    favorite: OilPrice
}
const oil: Oil['favorite'] = OilPrice.MAX
//! Если 2 interface имеют одинаковые имена то они объединяются
interface A{
    a: string
} 
interface A{
    b: string
}
class Alla implements A{
    a: string;
    b: string;
}

//TODO ------------------------------Функции------------------------------
//! Перегрузка операторов (функций/методов). Кол-во аргементов не должно изменяться.
function len(s: string): number;
function len(arr: any[]): number;
function len(x) {
  return x.length;
}
//! callback описываються так же как и методы в interface/type 

//TODO -------------------------------Пространство имен и модули-------------------
//! 
//! TypeScript добавляет особый импорт 'import type' указывающий что импортируется именно тип. Так же префикс import {type Dog} - указывает тоже самое
import type { Dog } from '.'
import { type Man } from '..'   
//? NAMESPACE УСТАРЕЛ, ИСПОЛЬЗУЕМ ES6 МОДУЛИ!!!!!!!!!!!!!1
//! namespace (пространство имен) - специальная конструкция, для отделения области видимости. Все что помещенно в Namespace инкапсулированно в нем. Для получения доступа нужно экспортировать что-то из namespace словом export
namespace Languages{
    const PI = 3.13
    export const say = () => {}
}
Languages.say()
//! Что бы импортировать namespace в другой файл используется специальный синтаксис '/// <reference path=''


//TODO --------------------------------Заголовочные файлы----------------------------
//! Если мы берем что-то из Js файлы и хотим использовать в ts, то с помощью declare мы сможем типизировать эту сущность и в дальнейшем использовать. Мы берем name из глобального пространства имен не импортируя его
//! Либо объявить их в файлах ..d.ts - заголовочных файлах 
declare const Kat = 'Kitty'

//TODO --------------------------------Generics---------------------------------------
//! Универсальные типы или обобщения (generic) - используется для создания|указания типов. Синтаксис: <T1, T2 ...> - сколько угодно при объявлении, далее при использовании в <Type> передаем тип|типы <string, Date, number, ...>. Type - это люой валидный тип или выражение типа, в нем можно использовать уточнения, union и т.д. Примеры с разными структурами нижу.
//? Так же generic типы берут свой тип из передаваемых данных, если мы обяъвим generic type и используеем этот тип что бы типизировать входныее данные функции, тот этому типу присвоится тип передаваемого параметра

class M<T1, T2>{
    constructor(
        public type: T1,
        private activated: T2
    ){}
}
new M<string, boolean>('s', true) //* явно параметризируем
new M('s', 'a') //* не явно, TS сам выводит типы

type Type<T> = {
    name: string,
    value: T
}

function named<T>(name: T): T{return name}
const red = <In>(elem: In): void => {}

//! Сужение типов. 
//! Ключевое слово extends. Type1 extends Type2 - Type1 расширяет Type2 или Type1 должен быть подтипом Type2. То есть мы сужаем перечень возможных передаваемых типов путем указания расширяемого типа 

type Returned = { lenght: number }

const retrund = <Type extends Returned>(ret: Type): number => {
    return ret.lenght*2  //* т.к Type является подтипом Returned, то у него точно будет lenght
}

//! Условные типы - это аналог тернарного оператора для типов
type TypeTer<T1, T2> = T1 extends T2 ? never : T1 //* Если T1 является подтипов T2 то условие === true и вернется true, иначе false

//? При использовании уловных типос с union TS сравниевает каждый элемент union type и возвращает ответ, затем в конце объединяет их братно в union type
type TypeTerTest = TypeTer<'a' | 'b' | 'c', 'a'> //* TypeTerTest = 'b' | 'c'

//! Захват типа в условной конструкции - infer 

//TODO --------------------------------Декортаоры------------------------------------- 

//TODO-----------------------------------------Utility Types --------------------------------------------------
//?------------------------- Function
//! ReturnType<> - возвращает тип, который возвращает переданя функция выводя его динамически
const selector = (str: string) => str.toLowerCase()
type Select = ReturnType<typeof selector> //* Select = string

//! Omit<type, union> - создает новый тип исключая указанные поля
type Developer = {
    name: string,
    age: number,
    language: string
}

type Maxim = Omit<Developer, 'language'> //? исключил поле 'language'

//! Pick<type, union> - создает новый тип с указанными полями
type LanguageHistory = Pick<Developer, 'age' | 'language'>

//! Partial<type> - делает все поля 
//! Requared<type> - делает все поля обязательными



//TODO------------------------------------------TS with React-------------------------------------------------
//! для типизации функционаяльного компонета тип FC<Props>, где Props это тип получаемых пропсов   
//? Hooks
//! useState<T>(state, state()), где T тип state, по умолчанию выводится автоматически
//? Redux 
//! Для типизации useSelectore, нужном с помощью ReturnType вурнуть тип rootReducer, и затем с помощью generic TypedUseSelectorHook<Type> протипизировать useSelectore
//! тип  