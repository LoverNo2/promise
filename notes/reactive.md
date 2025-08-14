响应式的基础是 proxyApi，使用 proxyApi 包装原始对象并自定义 get/set 方法，在 get 方法中收集依赖，在 set 方法中触发依赖。

依赖是响应式中的重要概念，本质就是一段代码。如何将一段代码视为依赖？将其包裹在一个箭头函数并传入 effect 方法，effect 方法会记录并执行一次这段代码，如果这段代码在执行期间访问响应式数据时就会被当作依赖收集起来。

依赖以何种数据结构存储？依赖被一个三层结构的数据结构存储，最外层是一个 map，map 的 key 是原始对象，map 的 value 是一个 weakMap，weakMap 的 key 是原始对象的属性，weakMap 的 value 是一个 set，set 的元素即为依赖。
