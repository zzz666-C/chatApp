import React,{useEffect,useState,useContext} from "react";

import { ChatAppContext } from "../Context/ChatAppContext";
import {Filter,Friend} from "../Components/index";
const ChatApp =() =>{
  return(
    <div>
     <Filter/>
     <Friend/>
    </div>
  )
}

export default ChatApp;
/**
 * ChatApp 是一个 函数组件，用于显示上下文提供的全局数据。
 */