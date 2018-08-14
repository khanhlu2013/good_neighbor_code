import React,{Component} from 'react';
import FindByEmail from './FindByEmail.react.js';
import Friends from './Friends.react.js';
import keys from '../configs/keys.js';

class Profile extends Component{
  state = {
    connections : []
  }

  static getDerivedStateFromProps(props,state){
    const friends = state.connections
      .filter(connection=>connection.approvedByTo&&!connection.revokedByFrom)
      .map(connection=>{
        if(connection.from._id === props.loginUser._id){
          return connection.to;
        }else if(connection.to._id === props.loginUser._id){
          return connection.from;
        }else{
          throw Error('Error: unexpected return connection');
        }
      });
    return {friends}
  }  

  onConnectionsChangeCb = ()=>{
    (async ()=>{
      const request = await fetch(keys.API_URL('profile.friends'),{credentials:'include'});
      const connections = await request.json();
      this.setState({connections});      
    })();
  }

  componentDidMount(){
    this.onConnectionsChangeCb();
  }

  render(){
    return (
      <div id="Profile-react">
        <div>
          Profile: {this.props.loginUser.name} - {this.props.loginUser.email}
          <a href={keys.API_URL('profile.logout')}>logout</a>
        </div>
        <FindByEmail 
          onConnectionsChangeCb={this.onConnectionsChangeCb} 
          loginUser={this.props.loginUser}/>
        <Friends friends={this.state.friends}/>
      </div>
    );
  }
}

export default Profile;