import React from 'react';

function Friends(props){
  return(
    <div>
      <p>You have {props.friends.length} friend(s)</p>
      <table>
        <thead>
          <tr>
            <th>name</th>
          </tr>
        </thead>

        <tbody>
          {props.friends.map(friend=><tr key={friend._id}><td>{friend.name}</td></tr>)}          
        </tbody>

      </table>
    </div>
  )
}

export default Friends;