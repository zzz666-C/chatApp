import Link from "next/link";
import Image from "next/image";
import style from "./Card.module.css";
import images from "../../assets";
  
const Card=({readMessage,el,i,readUser})=>{
    const shortAddr = el?.pubkey ? `${el.pubkey.slice(0,6)}...${el.pubkey.slice(-4)}` : "";
    return (
        <Link href={{pathname:"/",
        query:{name:`${el.name}`,address:`${el.pubkey}`}
        }}>
            <div className={style.card} 
            onClick={()=>(readMessage(el.pubkey),readUser(el.pubkey))}
            >
                <div className={style.card_box}>
                    <div className={style.card_box_left}>
                       <Image
                       src={images.accountName}
                       alt="username"
                          width={50}
                            height={50}
                            className={style.card_box_left_img}
                            /> 
                    </div>
                    <div className={style.card_box_right}>
                        <div className={style.card_box_right_middle}>
                           <h4>{el.name}</h4>
                           <small>{shortAddr}</small>
                        </div>
                        <div className={style.card_box_right_end}>
                            <small>{i+1}</small>
                            </div>
                            </div>
                        </div>
                </div>
            </Link>
    );
};

export default Card;