/*这是一个模块的入口文件，通常用于集中管理和导出多个组件，
以便在其他文件中更方便地导入这些组件。*/
//导入组件:
import NavBar  from "./NavBar/NavBar";
import Filter from "./Filter/Filter";
import Error from "./Error/Error"; // Changed to match the correct case
import Loader from "./Loader/Loader";
import Model from "./Model/Model";
import UserCard from "./UserCard/UserCard";
import Friend from "./Friend/Friend";

//导出组件:
export { NavBar , Filter, Error, Loader, Model, UserCard, Friend};