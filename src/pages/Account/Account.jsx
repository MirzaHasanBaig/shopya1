import React,{useEffect} from 'react';
import {useSelector} from 'react-redux'
import Client from './Client/Client'
import Admin from './Admin/Admin'
import {useHistory} from 'react-router-dom'

function Account() {
const {currentUser} = useSelector((state) => state.user);
const history = useHistory();
  if(!currentUser){
    history.push("/login");
  }
  return (
    <div className="page-content mt-10">
        {!currentUser.isadmin?
        <Client/>
        :
        <Admin/>
        }
    </div>
  )
}

export default Account