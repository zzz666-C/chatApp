// SPDX-Licenses-Identifier: MIT

pragma solidity ^0.8.0;

//用户结构体
contract ChatApp{
    struct user{
        string name;
        friend[] friendList;

    }

//好友结构体
    struct friend{
        string name;
        address pubkey;
    }

//消息结构体
    struct message{
        address sender;
        string msg;
        uint256 timestamp;
    }

//存储用户的基本信息的结构体
     struct AllUserStruck{
        string name;
        address accountAddress;
    }    

    AllUserStruck[] getAllUser;

    mapping (address => user) userlist;
    mapping (bytes32 => message[]) allMessages; 

//检查用户是否存在
    function checkUserExists(address pubkey) public view returns(bool){
        //返回名称的字节长度是否大于0
        return bytes(userlist[pubkey].name).length > 0;
    }

//为用户创建一个新账户
    function creatAccount(string calldata name) external{
        require(checkUserExists(msg.sender)==false,"User already exists");
        require(bytes(name).length>0,"Username cannot be empty");

//设置用户名称
        userlist[msg.sender].name=name;
        getAllUser.push(AllUserStruck(name,msg.sender));

    }

//为外部调用者提供一种方式，通过用户的以太坊地址查询其用户名
    function getUsername(address pubkey) external view returns(string memory) {
        require(checkUserExists(pubkey) == true, "User does not exist");
        return userlist[pubkey].name;
    }

//添加好友的功能      
    function addFriend(address friend_key, string calldata name) external{
        require(checkUserExists(msg.sender),"Create an account first");
        require(checkUserExists(friend_key),"User is not registered");
        require(msg.sender!=friend_key,"User cannot add yourself as a friend");
        require(checkAlreadyFriends(msg.sender,friend_key)==false,"These two users are already friends");

        _addFriend(msg.sender,friend_key,name);
        _addFriend(friend_key,msg.sender,userlist[msg.sender].name);

    }   

//检查两个用户是否已经是好友
    function checkAlreadyFriends(address pubkey1,address pubkey2) internal view returns(bool){
        //提高查找效率
        if (userlist[pubkey1].friendList.length> userlist[pubkey2].friendList.length){
            address temp=pubkey1;
            pubkey1=pubkey2;
            pubkey2=temp;
    }
    //for循环遍历
    for(uint256 i=0;i<userlist[pubkey1].friendList.length;i++){
        if(userlist[pubkey1].friendList[i].pubkey==pubkey2){
            return true;
        }
    }
    return false;
    }
 
 //向某个用户的好友列表中添加一个新的好友
    function _addFriend(address me,address friend_key,string memory name) internal{
        //创建好友结构体，friend 是一个结构体,使用传入的 name 和 friend_key 创建了一个新的 friend 实例，并将其存储在内存中（memory）
        friend memory newFriend=friend(name,friend_key);
        //将好友添加到好友列表中
        userlist[me].friendList.push(newFriend);
    }

//获取自己的好友列表,函数是 view 类型，不会修改区块链上的数据，因此调用它是免费的（不消耗 Gas）
    function getMyFriendList() external view returns(friend[] memory){
        return userlist[msg.sender].friendList;
    }

/*用于生成两个用户之间的唯一聊天标识符.该函数是一个内部（internal）的纯函数（pure），用于根据两个以太坊地址生成一个唯一的哈希值（bytes32 类型）。
这个哈希值可以用作两个用户之间的聊天标识符，确保无论地址的顺序如何，生成的标识符始终一致。*/
    function _getChatCode(address pubkey1,address pubkey2) internal pure returns(bytes32){
        if(pubkey1<pubkey2){
            return keccak256(abi.encodePacked(pubkey1,pubkey2));
        }else{
            return keccak256(abi.encodePacked(pubkey2,pubkey1));
        }
    }

//发送消息
    function sendMessage(address friend_key,string calldata _msg) external{
        require(checkUserExists(msg.sender),"Create an account first");
        require(checkUserExists(friend_key),"User is not registered");
        require(checkAlreadyFriends(msg.sender,friend_key),"You are not friends with the given user");

//生成聊天标识符
        bytes32 chatCode=_getChatCode(msg.sender,friend_key);
//使用 message 结构体创建一个新的消息对象 newMsg        
        message memory newMsg=message(msg.sender,_msg,block.timestamp);
//将新创建的消息对象 newMsg 添加到 allMessages 映射中对应的聊天记录数组中。allMessages 是一个以 chatCode 为键、消息数组为值的映射，存储了所有聊天记录        
        allMessages[chatCode].push(newMsg);
    }

//读取与特定好友的聊天记录
    function readMessage(address friend_key) external view returns(message[] memory){
        bytes32 chatCode=_getChatCode(msg.sender,friend_key);
       return allMessages[chatCode];
    }

//返回所有用户的信息
function getAllAppUser() external view returns(AllUserStruck[] memory){
    return getAllUser;    
}
}