import React,{useState,useContext} from "react";
import Image from "next/image";
import Style from "./Filter.module.css";
import images from '../../assets';
import { ChatAppContext } from "../../Context/ChatAppContext";
import {Model} from '../index';

const Filter = () => {
    const {account,addFriends} = useContext(ChatAppContext); 
    
    const [addFriend,setAddFriend] = useState(false);
    return (
    <div>
       <div className={Style.Filter}> 
       <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
            <div className={Style.Filter_box_left_search}>
                <Image src={images.search} alt="image" width={20} height={20} />
                <input type="text" placeholder="Search..." />
                </div>
            </div>
        <div className={Style.Filter_box_right}>
            <button onClick={() =>setAddFriend(true)}>
                <Image src={images.user} alt="clear" width={20} height={20} />
                ADD FRIEND
            </button>
            <button>
                <Image src={images.clear} alt="clear" width={20} height={20} />
                CLEAR CHAT
            </button>
            </div>
        </div>   
    </div>
    {addFriend &&(
        <div className={Style.Filter_model}>
             <Model openBox={setAddFriend}
             title="WELCOME TO"
             head="CHAT BUDDY"
             info="Lorem ipsun color sit amet consectetyr"
             smallInfo="Kindley seclet your name..."
             image={images.hero}
             functionName={addFriends}
             />

        </div>
    )}
   </div> 
    )
}

export default Filter;