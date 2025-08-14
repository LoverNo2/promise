[[Prototype]]是对象的一个内部属性，它指向原型对象或者是构造函数。对象可以以\_\_proto\_\_的值的形式被设置为另一个对象的原型对象，\_\_proto\_\_是[[Prototype]]的 getter/setter(使用 Object.getPrototypeOf/Object.setPrototypeOf 代替\_\_proto\_\_)。

JavaScipt 中万物皆对象。

每一个对象都有一个[[Prototype]]属性，这个属性指向它的原型。

每一个函数都有一个默认的 prototype 属性，这个属性指向一个对象，以该函数创建的对象的[[Prototype]]为函数的 prototype。

**proto** ：

- 是一个 访问器属性 （getter/setter），挂载在 Object.prototype 上
- 提供了一种间接访问和修改 [[Prototype]] 的方式
- 当你读取 obj.**proto** 时，实际上是调用了 Object.prototype.**proto** 的 getter 方法，返回 obj 的 [[Prototype]]
- 当你设置 obj.**proto** = value 时，实际上是调用了 setter 方法，修改 obj 的 [[Prototype]]

### 1. **proto** : Object

这是控制台对 Object.prototype.**proto** 的一种简化表示，实际含义是：

- **proto** 是 Object.prototype 上的一个属性
- 它是一个 访问器属性 （而非普通数据属性）
- 控制台显示 Object 可能是因为这个属性关联的是对象类型的操作

### 2. get **proto** : ƒ **proto**()

这是 **proto** 访问器属性的 getter 方法 ：

- 当你读取任何对象的 **proto** 属性时（如 obj.**proto** ），实际调用的就是这个函数
- 它的作用是返回对象内部的 [[Prototype]] 属性值
- 等同于标准方法 Object.getPrototypeOf(obj)

### 3. set **proto** : ƒ **proto**()

这是 **proto** 访问器属性的 setter 方法 ：

- 当你设置任何对象的 **proto** 属性时（如 obj.**proto** = newProto ），实际调用的就是这个函数
- 它的作用是修改对象内部的 [[Prototype]] 属性值
- 等同于标准方法 Object.setPrototypeOf(obj, newProto)

你在控制台中点击查看 Object.prototype.**proto** 时， 确实会调用 get **proto** 方法
