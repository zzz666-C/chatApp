/*这段代码定义了一个 React 上下文（Context）和一个上下文
提供者组件（Provider），用于在 React 应用中管理和共享状态。
*/
// 导入依赖
import React,{useState,useEffect,useContext} from "react";
import { useRouter } from "next/router";



// 导入工具函数
import {
    ChechIfWalletConnected,
    connectWallet,
    connectingWithContract,
    
} from "../Utils/apiFeature";


// 创建上下文
export const ChatAppContext = React.createContext();

// 创建上下文提供者组件
/* ChatAppContext.Provider 是上下文的提供者，它通过 value 属性定义共享的数据。
children 是子组件，它们可以访问 value 中的数据。*/

//状态变量使得组件能够动态地响应用户操作和异步数据的变化
export const ChatAppProvider = ({ children }) => {
    const [account,setAccount] = useState("");
    const [userName,setUserName] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
    const [userLists,setUserLists] = useState([]);
    const [friendMsg,setFriendMsg] = useState([]);
    const [friendLists,setFriendLists] = useState([]);

    const [currentUserName,setCurrentUserName]=useState("");
    const [currentUserAddress,setCurrentUserAddress]=useState("");

    const router = useRouter();

    //异步数据获取，用于从区块链合约中获取数据，确保数据在应用加载时被初始化。
    const feachData = async () =>{
        try{
            // 仅检测是否已经连接，不主动弹出连接请求
            const connectAccount = await ChechIfWalletConnected();
            if(!connectAccount){
                setAccount("");
                return;
            }
            setAccount(connectAccount);

            const contract = await connectingWithContract();
            const userName = await contract.getUsername(connectAccount);
            setUserName(userName);
            const friendLists = await contract.getMyFriendList();
            setFriendLists(friendLists);
            const userLists = await contract.getAllAppUser();
            setUserLists(userLists);
        }catch(error){
           // setError("Please Install And Connect Your Metamask");
        }
    };


    // 封装一个上下文内的连接方法：更新 account、关闭错误提示并加载链上数据
    const connectToWallet = async () => {
        try{
            const acc = await connectWallet();
            if(acc){
                setAccount(acc);
                setError("");
                await feachData();
                return acc; // 返回连接后的地址，便于组件内使用
            }else{
                setError("Please install and connect MetaMask");
                return "";
            }
        }catch(err){
            setError("Failed to connect wallet");
            return "";
        }
    };

    //Hook 在组件挂载时调用
    useEffect(()=>{
       feachData();
    },[]);

    //读取消息的函数，处理与智能合约的交互
    const readMessage = async(friendAddress) =>{
        try{
            const contract = await connectingWithContract();
            if(!contract) throw new Error("Contract not available");
            const read = await contract.readMessage(friendAddress);
            setFriendMsg(read);
        }catch(error){
            console.log("Currently You Have no Message");
        }
    };

    //创建账户的函数，处理与智能合约的交互
    const createAccount = async(name, accountAddress) =>{
        try{
            // 只校验名称，账户地址由连接的钱包(msg.sender)决定
            if(!name || String(name).trim().length === 0) return setError("Name cannot be empty");
            const contract = await connectingWithContract();
            setLoading(true);
            const tx = await contract.creatAccount(name.trim());
            await tx.wait();
            setLoading(false);
            window.location.reload();
        }catch(error){
            setLoading(false);
            setError("Something Went Wrong While Creating An Account");
        }
    }

     //添加好友的函数，处理与智能合约的交互   
    const addFriend = async({name,accountAddress}) =>{
        try{
            if(!accountAddress || !name) return setError("Friend Name and Address cannot be empty");
            const contract = await connectingWithContract();
            const addMyFriend = await contract.addFriend(accountAddress,name);
            setLoading(true);
            await addMyFriend.wait();
            setLoading(false);
            router.push("/");
            window.location.reload();
        }catch(error){
            setError("Somthing Went Wrong While Adding a new Friend");
        }
     }

    //发送消息的函数，处理与智能合约的交互  
    const sendMessage = async ({ msg, friendAddress, address }) => {
       try {
        const to = friendAddress || address;
        if (!msg || !to) return setError("Please Type your Message");
        const contract = await connectingWithContract();
        setLoading(true);
        const addMessage = await contract.sendMessage(to, msg);
        await addMessage.wait();
        setLoading(false);
        window.location.reload();
       } catch (error) {
        setLoading(false);
        setError("Please reload and try again");
       }
    };

    //读取用户信息的函数，处理与智能合约的交互
    const readUser = async(userAddress) =>{
       try{
         const contract = await connectingWithContract();
         if(!contract) throw new Error("Contract not available");
         const userName = await contract.getUsername(userAddress);
         setCurrentUserName(userName);
         setCurrentUserAddress(userAddress);
       }catch(err){
         console.error("readUser failed:", err?.message || err);
       }
    };



    //导出上下文提供者组件，并传递数据给子组件
  return (
    <ChatAppContext.Provider 
    value={{
        account,
        userName,
        createAccount,
        loading,
        error,
        setError,
        userLists,
        friendLists,
        addFriend,
        sendMessage,
        friendMsg,
        readMessage,
        readUser,
        currentUserName,
        currentUserAddress,
        ChechIfWalletConnected,
        connectWallet: connectToWallet,
    }}>
     {children}
    </ChatAppContext.Provider>
  );


};