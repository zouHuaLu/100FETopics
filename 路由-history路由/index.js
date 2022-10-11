/*
history路由模式的实现，是要归功于HTML5提供的一个history全局对象，
可以将它理解为其中包含了关于我们访问网页（历史会话）的一些信息。
同时它还暴露了一些有用的方法，比如：
    window.history.go 可以跳转到浏览器会话历史中的指定的某一个记录页
    window.history.forward 指向浏览器会话历史中的下一页，跟浏览器的前进按钮相同
    window.history.back 返回浏览器会话历史中的上一页，跟浏览器的回退按钮功能相同
    window.history.pushState 可以将给定的数据压入到浏览器会话历史栈中
    window.history.replaceState 将当前的会话页面的url替换成指定的数据
**/
