import logo from "./logo.png";
import close from "./close.png";
import open from "./open.png";
import search from "./search.png";
import avatar from "./avatar.gif";
import smile from "./smile.png";
import send from "./send.png";
import file from "./file.png";
import user from "./user.png";
import clear from "./delete.png";
import create from "./create.png";
import create2 from "./create2.png";
import buddy from "./buddy.png";
import hero from "./hero.png";
import account from "./account.png";
import username from "./username.png";
import friends from "./friends.png";
import friends2 from "./friends2.png";
import accountName from "./acountName.png";
import dot from "./dot.png";
import loader from "./loader.gif";
import image1 from "./img1.gif";
import image2 from "./img2.gif";
import image3 from "./img3.gif";
import image4 from "./img4.gif";
import image5 from "./img5.gif";
import image6 from "./img6.gif";
import image7 from "./img7.gif";
import image8 from "./img8.gif";
import image9 from "./img9.gif";
import image10 from "./img10.gif";

export default {
  logo,
  close,
  open,
  search,
  avatar,
  smile,
  send,
  file,
  user,
  clear,
  create,
  create2,
  buddy,
  hero,
  account,
  username,
  friends,
  friends2,
  accountName,
  dot,
  loader,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  // 兼容别名：支持 img1..img10 写法
  img1: image1,
  img2: image2,
  img3: image3,
  img4: image4,
  img5: image5,
  img6: image6,
  img7: image7,
  img8: image8,
  img9: image9,
  img10: image10,
  // 兼容历史拼写：acountName 与 accountName 同指向
  acountName: accountName,
};

// 头像资源数组与安全获取助手（支持 0/1 基索引，并做越界环绕）
export const avatarImages = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
];

export const getUserImage = (index, base = 1) => {
  const arr = avatarImages;
  if (typeof index !== "number" || !Number.isFinite(index)) return arr[0];
  const zeroBased = base === 0 ? index : index - 1;
  const i = ((zeroBased % arr.length) + arr.length) % arr.length;
  return arr[i];
};
