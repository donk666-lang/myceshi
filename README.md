## 简介
项目采用  Vue3 + Typescript + Vite + ElementPlus

主要用来 学习 vite TS 和 vue3 的新特性 

## 开发
```bash
#下载包 
npm install

# 启动
npm run dev


```



## ts语法笔记
```bash
类型 --  例子 --  备注

1. number   let a = 123  数字
2. string   let a = '123'  字符串
3. boolean  let a = true   布尔值
4. 字面量    let a: 'max' | 'min'  字面量类型
5. any      let a   任意类型 可以赋值给任何值
6. unknown  let a:nuknow   不知道的类型  赋值给其他类型会报错  
7. 类型断言  s = a as string; ||  s = <string>a

8. void   function f(): void{}   函数返回空值   null | undefined
9. never  function f(): never{}   函数永远不会有返回结果  少见   


10. object
  # 在属性后面添加 ？ 表示属性是可选的
  let b:{name: string, age?:number }
  b = {name: 'aaa', age:18 }
  # [propName: string]: any 表示 仍以类型的属性
  let c:{name: string, [propName: string]: any}

  #设置函数结构的类型申明
  let f: (a:number, b:number)=>number

11. array
  #  string[] | Array<string>  表示字符串类型的数组
  let e: string[]
  let e: Array<string> 


12. tuple  元组
  # [string, number]  就是固定长度的数组 
  let g: [string, number]
  g = ['ss',12]

13. enum   枚举 
  # 枚举类型
  enum Gender{
    Male,
    Female
  } 
  let h: {name: string, gender: Gender}
  h = {
    name:'ss',
    gender: Gender.Male
  }

14. 类型别名
  type myTpye = {name: string, age?:number }
  let j: myTpye
  j = {name: 'aaa', age:18 }

```


## 类
```bash

#；类的继承
class Animal{
  name: strung
  constructor(name: string){
    this.name = name
  }
  sayHello() {
    console.log('动物')
  }
}

class Dog extends Amimal{
  sayHello() {
    console.log('🐶')
  }
}

```
## 接口
```bash
#接口只定义对象的结构，而不考虑实际值
#在接口中所有的方法都是抽象方法
interface myInterface {
  name:string,
  age:number
}

class MyClass implements
```

## 范型
```bash
# 在定义函数或类时，如果遇到类型不明确的就可以使用泛型 <T> 必须先申明才能使用
function fn<T>(a: T): T{
  return a
}

```


## 初始化项目
引入 vue-router 搭建路由   完成 
vite 配置 plugins 插件    完成
首页 页面 侧边栏       完成
登陆注册页面      完成
个人信息展示页面   待完成
····


