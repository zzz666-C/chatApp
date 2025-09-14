import React, { useContext } from "react";
import Style from "./Error.module.css"; 
import { ChatAppContext } from "../../Context/ChatAppContext";

const Error = () => {
    const { account, connectWallet, error } = useContext(ChatAppContext);

    // 如果已连接钱包，则不显示任何内容
    if (account) return null;

    return (
        <div className={Style.Error} role="dialog" aria-modal="true" aria-labelledby="metamask-required-title">
            <div className={Style.Error_box}>
                <h1 id="metamask-required-title">Please connect MetaMask to continue</h1>
                {error && <p>{error}</p>}
                <button onClick={connectWallet} style={{ marginTop: "1rem" }}>
                    Connect Wallet
                </button>
            </div>
        </div>
    );
};

export default Error;
