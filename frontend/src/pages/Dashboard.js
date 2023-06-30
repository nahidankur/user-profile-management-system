import React, { useEffect, useState } from 'react'
import './dashboard.css'
import { useNavigate} from 'react-router-dom'
import ProfileTable from '../component/ProfileTable'
import {getProfiles } from '../redux/profile/profileSlice'
import {useDispatch, useSelector } from 'react-redux'
import Spinner from '../component/Spinner'


const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state)=> state.auth)
    const { profiles, isLoading, isError, message } = useSelector((state)=> state.profile)

    const [loading, setLoading] = useState(true);

    useEffect(()=> {
       
        if(!user){
            navigate('/')
        }

        dispatch(getProfiles()).then(()=>setLoading(false))


    }, [navigate, user, dispatch,isError, message])

    if(isLoading){
        return <Spinner />
    }  
  return (
 <>
{ !loading && <ProfileTable profiles={profiles} /> }
 </>
  )
}

export default Dashboard