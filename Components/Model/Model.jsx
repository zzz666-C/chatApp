import React, {useState, useContext, useEffect} from "react";
import Image from "next/image";

import Style from "./Model.module.css";
import images from "../../assets";
import { ChatAppContext } from "../../Context/ChatAppContext";
import {Loader} from "../index";
const Model = (
    {openBox,title,address,head,info,smallInfo,image,functionName}
) => {
    const [name,setName] = useState("");
    const [accountAddress,setAccountAddress] = useState("");

    const {loading, account, connectWallet} = useContext(ChatAppContext);

    // 当弹窗打开且全局 account 或父组件 address 变化时，自动将地址预填到输入框
    useEffect(() => {
        if (!accountAddress) {
            setAccountAddress(address || account || "");
        }
    }, [address, account]);

    const canSubmit = name.trim().length > 0 && !loading;

    const onSubmit = async () => {
        if (!canSubmit) return;
        // 确保已连接钱包
        if (!account) {
            const acc = await connectWallet?.();
            if (!acc) return; // 连接失败则不继续
        }
        await functionName(name.trim(), accountAddress || account);
    };

    return (
    <div className={Style.Model}>
        <div className={Style.Model_box}>
           <div className={Style.Model_box_left}>
           <Image src={image} alt="buddy" width={700} height={700} />
            </div>
            <div className={Style.Model_box_right}> 
            <h1>{title}
            <span>{head}</span>
            </h1>
            <p>{info}</p>
            <small>{smallInfo}</small>

            
        {
            loading==true?(
                <Loader />
            ):(
                <div className={Style.Model_box_right_name}>
                 <div className={Style.Model_box_right_name_info}>
             <Image src={images.username} alt="name" width={30} height={30} />
              <input
                 type="text"
                 placeholder="enter your name"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 disabled={loading}
                 aria-disabled={loading}
                   />
                      </div>   
                <div className={Style.Model_box_right_name_info}>
                    <Image src={images.account} alt="user" width={30} height={30} />
                    <input 
                        type="text" 
                        placeholder={account || address || "enter address (auto from wallet)"}
                        value={accountAddress}
                        onChange={(e)=>setAccountAddress(e.target.value)} 
                        disabled
                    />
            </div>

            <div className={Style.Model_box_right_name_btn}>
                <button onClick={onSubmit} disabled={!canSubmit} aria-disabled={!canSubmit}>
                    {""}
                    <Image src={images.send} alt="send" width={30} height={30} />
                    {""}
                    {loading ? "Submitting..." : "Submit"}
                    </button>

                    <button onClick={()=>openBox(false)}>
                    {""}
                    <Image src={images.close} alt="send" width={30} height={30} />
                    {""}
                    Cancel
                    </button>    
                </div>
            </div>
            )
            }    

            </div>
      </div>
    </div>
    );
};

export default Model;