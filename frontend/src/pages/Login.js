import React, { useState, useEffect } from 'react'
import {login, reset } from '../redux/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import './register.css'
import { toast } from 'react-toastify'
import {useDispatch, useSelector } from 'react-redux'
import Spinner from '../component/Spinner'


const Login = () => {
	const [formData, setFormData] = useState({
		email : '',
		password: ''
	})
	const { email, password} = formData

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { user, isLoading, isError, isSuccess, message } = useSelector((state)=> state.auth)

    const onChange = (e)=>{
		 setFormData((prevState) => ({
			...prevState,
			[e.target.name] : e.target.value
		 }))
	}

const onSubmit = (e)=> {
      e.preventDefault()

		const userData = {
			 email, password
		}
		dispatch(login(userData))
		

}

     useEffect(()=> {
		if(isError) {
			toast.error(message)
		}
		if(isSuccess || user) {
			toast.success('Login Successful')
			navigate('/dashboard')
			
		}
		
		dispatch(reset())
	 }, [user, navigate, dispatch, isError,message])

	if(isLoading){
		return <Spinner />
	}
	return (

		<div className="signup-form">
			<form onSubmit={onSubmit} >
				<h2>Login</h2>
				<p>Please fill in this form to login!</p>
				<hr />
			
				<div className="form-group">
					<div className="input-group">
						<div className="input-group-prepend">
							<span className="input-group-text">
								<i className="fa fa-paper-plane"></i>
							</span>
						</div>
						<input
						onChange={onChange}
						name='email'
						value={email}
						type="email" className="form-control"  placeholder="Email Address" required="required" />
					</div>
				</div>
				<div className="form-group">
					<div className="input-group">
						<div className="input-group-prepend">
							<span className="input-group-text">
								<i className="fa fa-lock"></i>
							</span>
						</div>
						<input
						name='password'
						onChange={onChange}
						value={password}
						type="password" className="form-control"  placeholder="Password" required="required" />
					</div>
				</div>
			

				<div className="form-group">
					<button type="submit" className="btn btn-primary btn-lg">Login</button>
				</div>
			</form>
			<div className="text-center">Don't have an account? <Link style={{ color : 'black' }} to='/'>Register here</Link></div>
		</div>
	)
}

export default Login