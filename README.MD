让你的微信小程序项目拥有类似与vue的响应式数据的特性，从而让你不用在代码中显式调用setData函数。

- 如果你的微信微信基础库版本>2.1.1,你可以直接在项目中引入npm包

```
npm install --save wx-reactdata

//app.js
import 'wx-reactdata'
```
- 如果你的项目不支持npm，那么需要你手动引入
```
//app.js
import './node_modules/wx-reactdata/src/index'
```

**如何使用**

在app.js中引入'wx-reactdata'之后，你就可以在页面中更新页面数据

```
this.$data.name = 'lee'
this.$data.pets[0].type = 'dog'
this.$data.pets = [1,2,3]
this.$data.info.name = 'limei'
this.$data.info = { a: 2 }

// 等同于
this.setData({
  name: 'lee',
  pets: [1,2,3],
  info: { a: 2 }
})
```

理论上每次对this.$data的属性赋值都会执行一次setData,如上面的代码可能是要执行5次setData,这违背了小程序不能频繁setData的原则。其实这种担心是多余的，它会缓存所有的setData的操作，知道当前队列函数执行完成后才会执行真正的setData操作，也就说上面其实只执行了一次setData操作。
