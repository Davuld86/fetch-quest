
export function check_session(){
    fetch("/api/check_session").then((r) => {
        if (r.ok) {
          r.json().then((user) => { return user});
        }
        else{
            return (0)
        }
      })
}
