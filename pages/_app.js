//引入全局样式文件 globals.css，确保全站共享的 CSS 样式能生效。
import "../styles/globals.css";

import { ChatAppProvider } from "../Context/ChatAppContext";
//引入一个自定义的 NavBar 组件，应该是导航栏
import {NavBar, Error} from "../Components/index";

/*
MyApp 是一个自定义 App 组件，它接受 Component 和 pageProps 两个参数，这是 Next.js 默认传入的：

Component：当前页面组件，比如 pages/index.js 导出的页面。

pageProps：页面在服务端渲染（SSR）或静态生成（SSG）时需要的初始属性。

渲染逻辑：

最外层用 <div> 包裹（这里其实可有可无）。

<ChatAppProvider>：提供全局上下文。

<NavBar />：始终显示在页面顶部。

<Component {...pageProps} />：显示当前页面内容。

换句话说，每次路由切换时，NavBar 会一直存在，页面内容则根据 Component 动态切换。
*/
const MyApp = ({ Component, pageProps }) =>{ 
  return (
  
    <ChatAppProvider>
      <NavBar />
      <Error />
    <Component {...pageProps} />
    </ChatAppProvider>

);


};
  
//导出 MyApp，让 Next.js 用它作为整个应用的入口
export default MyApp;
