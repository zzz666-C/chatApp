import React,{ useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import Style from "./NavBar.module.css";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Model,Error } from "../index";
import images from "../../assets";

const NavBar = () => {
   const menuItems = [
      {menu: "All Users", link: "/alluser", },
      {menu: "CHAT", link: "/", },
      {menu: "CONTACT", link: "/", },
      {menu: "SETTING", link: "/", },
      {menu: "FAQS", link: "/", },
      {menu: "TREMS OF USE", link: "/", },
      
    ];

    const[active,setActive] = useState(2);
    const[open,setOpen] = useState(false);
    const[openModel,setOpenModel] = useState(false);

    const{account,userName,connectWallet,createAccount,error} = useContext(ChatAppContext);

    
      
    return ( 
        <div className={Style.NavBar}>
          <div className={Style.NavBar_box}>
            <div className={Style.NavBar_box_left}>
              <Image 
                src={images.logo} 
                alt="logo" 
                width={50} 
                height={50}
              />
            </div>

           {/*✅ 移动菜单,右侧导航菜单和按钮*/}  
          
            <div className={Style.NavBar_box_right}>
              <div className={Style.NavBar_box_right_menu}>
                {menuItems.map((el, i) => (
                  <div
                    onClick={() => setActive(i + 1)}
                    key={i + 1}
                    className={`${Style.NavBar_box_right_menu_item} 
                      ${active == i + 1 ? Style.active_btn : ""}`}
                  >
                    <Link 
                      className={Style.NavBar_box_right_menu_item_link}
                      href={el.link}
                    >
                      {el.menu}
                    </Link>
                  </div>
                ))}
    
                {/* ✅ 桌面菜单里额外的 Create Account 按钮 */}
                {/* ✅  右侧创建账户按钮} */}
                <div className={Style.NavBar_box_right_create}>
                  {account === "" ? (
                    <button onClick={() => setOpenModel(true)}>
                      <Image 
                        src={images.create}
                        alt="create"
                        width={20}
                        height={20}
                      />
                      <span>Create Account</span>
                    </button>
                  ) : (
                    <button onClick={() => setOpenModel(true)}>
                      <Image 
                        src={userName ? images.accountName : images.create2}
                        alt="Account image"
                        width={20}
                        height={20}
                      />
                      <small>{userName || "Create Account"}</small>
                    </button>
                  )}
                </div>
              </div>
    
              {open && (
                <div className={Style.mobile_menu}>
                  {menuItems.map((el, i) => (
                    <div
                      onClick={() => setActive(i + 1)}
                      key={i + 1}
                      className={`${Style.mobile_menu_item} 
                        ${active == i + 1 ? Style.active_btn : ""}`}
                    >
                      <Link 
                        className={Style.mobile_menu_item_link}
                        href={el.link}
                      >
                        {el.menu}
                      </Link>
                    </div>
                  ))}
    
                  <p className={Style.mobile_menu_btn}>
                    <Image 
                      src={images.cross}
                      alt="close"
                      width={50}
                      height={50}
                      onClick={() => setOpen(false)}
                    />
                  </p>
                  
                  <div className={Style.mobile_menu_connect}>
                    {account === "" ? (
                      <button onClick={() => connectWallet()}>
                        <span>Connect Wallet</span>
                      </button>
                    ) : (
                      <button onClick={() => setOpenModel(true)}>
                        <Image 
                          src={userName ? images.accountName : images.create2}
                          alt="Account image"
                          width={20}
                          height={20}
                        />
                        <small>{userName || "Create Account"}</small>
                      </button>
                    )}
                  </div>
                </div>
              )}
    
              <div 
                className={Style.NavBar_box_right_open}
                onClick={() => setOpen(true)}
              >
                <Image
                  src={images.open}
                  alt="open"
                  width={30}
                  height={30}
                />
              </div>
            </div>
          </div>

          {/* ✅ 创建账户的模态框 */}
          {openModel && (
            <div className={Style.modelBox}>
              <Model openBox={setOpenModel}
              title="WELCOME TO"
              head="CHAT BUDDY"
              info="Connect your wallet to start using Chat Buddy"
              smallInfo="Kindley seclet your name..."
              image={images.hero}
              functionName= {createAccount}
              address={account}
              />
        </div>
      )}
        {error === "" ? "" : <Error error={error} />}

      </div>
    );
};


export default NavBar;