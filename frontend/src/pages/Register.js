import React, { useState, useEffect } from 'react'
import {register, reset } from '../redux/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import './register.css'
import { toast } from 'react-toastify'
import {useDispatch, useSelector } from 'react-redux'
import Spinner from '../component/Spinner'

const Register = () => {
	const [formData, setFormData] = useState({
		username : '',
		email : '',
		password: '',
		password2: ''
	})
	const { username, email, password, password2} = formData

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { user, isLoading, isError, isSuccess, message } = useSelector((state)=> state.auth)

    const onChange = (e)=>{
		 setFormData((prevState) => ({
			...prevState,
			[e.target.name] : e.target.value
		 }))
	}

const onSubmit =  (e)=> {
      e.preventDefault()

	  if(password !== password2) {
		toast.error('Password Did not match')
	  } else {
		const userData = {
			username, email, password
		}
	 dispatch(register(userData))
	  }

}

     useEffect(()=> {
		if(isError) {
			toast.error(message)
		}
		if(isSuccess || user) {
			navigate('/dashboard')
		}
		
		dispatch(reset())
	 }, [ user, navigate, dispatch, isError,message])

	if(isLoading){
		return <Spinner />
	}
	return (

		<div className="signup-form">
			<form onSubmit={onSubmit} >
				<h2>Register</h2>
				<p>Please fill in this form to create an account!</p>
				<hr />
				<div className="form-group">
					<div className="input-group">
						<div className="input-group-prepend">
							<span className="input-group-text">
								<span className="fa fa-user"></span>
							</span>
						</div>
						<input
						name='username'
						id='username'
						value={username}
						onChange={onChange}
						type="text" className="form-control"  placeholder="Username" required="required" />
					</div>
				</div>
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
					<div className="input-group">
						<div className="input-group-prepend">
							<span className="input-group-text">
								<i className="fa fa-lock"></i>
								<i className="fa fa-check"></i>
							</span>
						</div>
						<input
						name='password2'
						onChange={onChange}
						value={password2}
						type="password" className="form-control"  placeholder="Confirm Password" required="required" />
					</div>
				</div>

				<div className="form-group">
					<button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
				</div>
			</form>
			<div className="text-center">Already have an account? <Link style={{ color : 'black' }} to='/login'>Login here</Link></div>
		</div>
	)
}

export default Register