import React,{useEffect,useState} from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Style from "./Chat.module.css";
import images from "../../assets";
import { convertTime } from "../../Utils/apiFeature";
import { Loader } from "../../Components/index";


const Chat = ({functionName,readMessage,
    account,userName
    ,loading,
    friendMsg,
    currentUserName,
    currentUserAddress,
    readUser,

})=>{

const [message,setMessage]=useState("");
const router = useRouter();
const chatAddress = router?.query?.address || "";

// derive message groups and helpers
const toLower = (s) => (s || "").toLowerCase();
const leftMsgs = (friendMsg || []).filter((m) => toLower(m?.sender) === toLower(chatAddress));
const rightMsgs = (friendMsg || []).filter((m) => toLower(m?.sender) === toLower(account));

const canSend = Boolean(chatAddress) && message.trim().length>0 && !loading;

const handleSend = async () => {
  if (!canSend) return;
  try {
    await functionName({ msg: message.trim(), address: chatAddress });
    setMessage("");
  } catch (err) {
    console.error("send failed:", err);
  }
};

useEffect(()=>{
    if(!router.isReady) return;
    const addr = router.query?.address || "";
    if (addr) {
        readMessage(addr);
        readUser(addr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[router.isReady, chatAddress]);

// Clear message when switching chat target
useEffect(()=>{
  setMessage("");
},[chatAddress]);



return (
    <div className={Style.Chat}>
       {currentUserName && currentUserAddress ? (
      <div className={Style.Chat_user_info}>
        <Image src={images.accountName} alt="image"
         width={70} height={70}
         />
         <div className={Style.Chat_user_info_box}>
              <h4>{currentUserName}</h4>
              <p className={Style.show}>{currentUserAddress}</p>
            </div>
        </div>  
   ) :(
    ""
   )}
   <div className={Style.Chat_box_box}>
     <div className={Style.Chat_box}>
        <div className={Style.Chat_box_left}>
           {
           leftMsgs.map((el,i) => (
             <div key={`left-${i}`}>
               <div className={Style.Chat_box_left_title}>
                   <Image src={images.accountName} alt="peer avatar" width={50} height={50} />
                   <span>
                     {currentUserName}{" "}
                     <small>Time: {convertTime(el.timestamp)}</small>
                   </span>
                 </div>
               <p>{el.msg}</p>
             </div>
           ))
           }
        </div>
        <div className={Style.Chat_box_right}>
           {
           rightMsgs.map((el,i) => (
             <div key={`right-${i}`}>
               <div className={Style.Chat_box_left_title}>
                   <Image src={images.accountName} alt="my avatar" width={50} height={50} />
                   <span>
                     {userName}{" "}
                     <small>Time: {convertTime(el.timestamp)}</small>
                   </span>
                 </div>
               <p>{el.msg}</p>
             </div>
           ))
           }
        </div>
     </div>
     {chatAddress ? (
       <div className={Style.Chat_box_send}>
       <div className={Style.Chat_box_send_img}>
       <Image src={images.smile} alt="smile" width={50} height={50}/>
       <input type="text" placeholder="Type a message"
       value={message}
       onChange={(e)=>setMessage(e.target.value)}
       disabled={loading}
       aria-disabled={loading}
       aria-busy={loading}
       />
       <Image src={images.file}
       alt="file"
         height={50}
         width={50}
         />
         {
            loading ==true? (
                <Loader/>
            ):(
                <Image src={images.send} alt="send" width={50} height={50}
                onClick={canSend ? handleSend : undefined}
                role="button"
                aria-disabled={!canSend}
                style={{ opacity: canSend ? 1 : 0.5, cursor: canSend ? "pointer" : "not-allowed", pointerEvents: canSend ? "auto" : "none" }}
            />
            )
         }
       </div>
       </div>
        ):""}
   </div>
    </div>
);
};

export default Chat;