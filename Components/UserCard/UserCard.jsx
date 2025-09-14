import React, { useEffect, useState } from "react";
import Image from "next/image";
import images, { getUserImage } from "../../assets";
import Style from "./UserCard.module.css";


const UserCard = ({ el, i, addFriend }) => {
  const [imgSrc, setImgSrc] = useState(() => {
    try {
      return typeof getUserImage === "function"
        ? getUserImage(i + 1)
        : images[`image${i + 1}`] || images.user;
    } catch {
      return images.user;
    }
  });

  useEffect(() => {
    try {
      const nextSrc = typeof getUserImage === "function"
        ? getUserImage(i + 1)
        : images[`image${i + 1}`] || images.user;
      setImgSrc(nextSrc);
    } catch {
      setImgSrc(images.user);
    }
  }, [i]);

  const [isAdding, setIsAdding] = useState(false);

  const handleAddFriend = async () => {
    if (isAdding) return;
    try {
      setIsAdding(true);
      await Promise.resolve(
        addFriend({ name: el.name, accountAddress: el.accountAddress })
      );
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className={Style.UserCard}>
      <div className={Style.UserCard_box}>
        <Image
          className={Style.UserCard_box_img}
          src={imgSrc}
          alt={`User avatar${el?.name ? ` of ${el.name}` : ""}`}
          width={100}
          height={100}
          onError={() => {
            if (imgSrc !== images.user) setImgSrc(images.user);
          }}
        />

        <div className={Style.UserCard_box_info}>
          <h3>{el.name}</h3>
          <p>{el.accountAddress?.slice(0, 25)}..</p>
          <button
            onClick={handleAddFriend}
            disabled={isAdding}
            aria-disabled={isAdding}
            aria-busy={isAdding}
          >
            {isAdding ? "处理中..." : "Add Friend"}
          </button>
        </div>
      </div>
      <small className={Style.number}>{i + 1}</small>
    </div>
  );
};

export default UserCard;