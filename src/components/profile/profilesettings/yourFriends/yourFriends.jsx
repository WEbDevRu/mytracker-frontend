import React from 'react';
import s2 from '../../friends/friends.module.scss';
import s from './yourFriends.module.scss'
import {offsetText} from "../../../../utils/textTransformation";
import {LoadMore} from "../../../common/loadMore";
import friendIcon from '../../../../assets/icons/users.svg'

const LoadingProfile = () =>{
    return <div className={s2.loading_profile}> </div>
}

const NoFriends = () =>{
    return <div className={s.noFriends}>
        <img src={friendIcon} alt=""/>
        <p>У вас ещё нет друзей</p>
    </div>
}

const YourFriends = (props) => {
    let friendsList = []
    let deleteFriend = (userId, key) =>{
     props.deleteFriend(userId, key)
    }

    let buttonSelector = (userId, buttonId) =>{
        if(props.friends[buttonId].isFetching === false){
            return <button className={s.delete_button} onClick={()=>{deleteFriend(userId, buttonId)}}>Удалить из друзей</button>
        }
        else{
            return <p>Загрузка</p>
        }

    }
    if(props.friends !== "no friends"){
        let i = 0
        friendsList = props.friends.map((friend)=> <div className={s2.line}>
            <div className={s2.names_row}>
                <p className="name">{friend.name}</p>
                <p className="soname">{friend.soName}</p>
            </div>
            <div className={s2.company}>{friend.company}</div>
            <div className={s2.description}><p className={s2.description_p}>{offsetText(friend.description)}</p></div>
            {buttonSelector(friend.userId, i++)}

        </div>)
    }else{
        friendsList = "empty"
    }
    return  (
            <div className={s2.yourFriends}>
                <h2>Ваши друзья:</h2>
                <LoadMore pages={friendsList} pageSize={props.pageSize} totalPages={props.totalFriends}
                          pageChanger={props.addToFriendsList} loader={<LoadingProfile />} emptyBlock={<NoFriends />}
                />


            </div>


    );
}
export default YourFriends;