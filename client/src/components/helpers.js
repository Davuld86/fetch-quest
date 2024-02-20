import Battle from "./Battle";

export function check_session(){
    fetch("/api/check_session").then((r) => {
        if (r.ok) {
          r.json().then((user) => {return(user)});
        }
        else{
            return (null)
        }
      })
}

export function checkFriend(friends, pageUser){
  let f = friends.filter((friend)=> friend.user_id_1 ==pageUser.id || friend.user_id_2==pageUser.id)
  if(f[0]){
      return 'Unfriend'
  }
  else{
      return 'Add Friend'
  }
}

