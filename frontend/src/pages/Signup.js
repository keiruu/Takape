import React, {useRef, useState} from 'react'
import {useAuth} from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import Navbar from '../components/Navbar'
import 'tippy.js/animations/scale.css';
import Tippy from '@tippyjs/react';
import Footer from '../components/Footer'

export default function Signup() {

    const signup_emailRef = useRef()
    const signup_passwordRef = useRef()
    const signup_passwordconfirmRef = useRef()
    const {login, signup} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSignup(e) {
        e.preventDefault()
    
        if(signup_passwordRef.current.value !== signup_passwordconfirmRef.current.value){
            setError("Passwords don't match")
            setShowError(true)
        } else {
            try {
                setError("")
                setLoading(true)
                await signup(signup_emailRef.current.value, signup_passwordRef.current.value)
                history.push('/')
              } catch(err) {
                setError(err.message)
                setShowError(true)
              }
        }
    
        setLoading(false)
    }


    // code to trigger transition animation
    const [isActive, setActive] = useState(false);
    const toggleClass = () => {
        setActive(!isActive);
    };

    // code to trigger tooltip errors
    const [showerror, setShowError] = useState(false)

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>

            <div className="flex-1">
                <div className="flex flex-col text-center md:text-left mb-10 lg:px-10 md:pl-4 md:flex-row justify-center bg-white lg:p-16 py-20 md:gap-x-20 lg:gap-x-32 rounded-3xl lg:w-med m-auto shadow-gray mt-10">
                    <div className="items-center">
                        <p className="my-2 mt-2 md:mt-8 text-accent font-semibold">━ Welcome! 👋</p>
                        <p className="font-bold text-5xl md:text-6xl lg:text-7xl my-6 mt-10 text-darkaccent">Sign Up</p>
                        <p className="my-1 mt-10 text-darkaccent text-sm md:text-md">Already have an account?</p>
                        <Link to="/login" className="underline text-darkaccent transition-all hover:text-accent text-sm md:text-md">Sign in</Link>
                    </div>
                    <form className="flex flex-col mt-8 lg:m-0" action="#" onSubmit={handleSignup}>
                        <Tippy visible={showerror} content={error} onClickOutside={() => setShowError(false)}>
                            <div>
                                <i className="fas fa-envelope absolute py-8 px-4 text-gray"></i>
                                <input className="focus:outline-none focus:ring focus:border-lightaccent hover:border-accent border-2 border-transparent transition-all bg-lightgray p-4 w-72 md:w-80 lg:w-96 md:text-md text-sm rounded-lg my-3 pl-12" type="email" placeholder="Enter your email" ref={signup_emailRef} />
                            </div>
                        </Tippy>

                        <div>
                            <i className="fas fa-lock absolute py-8 px-4 text-gray"></i>
                            <input className="focus:outline-none focus:ring focus:border-lightaccent hover:border-accent border-2 border-transparent transition-all bg-lightgray p-4 w-72 md:w-80 lg:w-96 md:text-md text-sm rounded-lg my-3 pl-12" type="password" placeholder="Enter your password" ref={signup_passwordRef} />
                        </div>

                        <div>
                            <i className="fas fa-lock absolute py-8 px-4 text-gray"></i>
                            <input className="focus:outline-none focus:ring focus:border-lightaccent hover:border-accent border-2 border-transparent transition-all bg-lightgray p-4 w-72 md:w-80 lg:w-96 md:text-md text-sm rounded-lg my-3 pl-12" type="password" placeholder="Confirm your password" ref={signup_passwordconfirmRef} />
                        </div>
                        
                        <div>
                            <button disabled={loading} type="submit" className="bg-bggradient w-72 md:w-60 lg:w-1/2 text-white p-2 py-4 rounded-xl shadow-light my-4 hover:border-white border-2 border-transparent transition-all font-semibold">
                                Register
                                <i className="fas fa-arrow-right mx-2"></i>
                            </button>
                        </div>
                    </form>
                </div>
            
                <footer className="footer relative md:fixed bg-white bottom-0 left-0 w-full bottom-0 bg-white text-center p-6">
                    <p className="font-bold text-brown">Takape by AKU</p>
                    <p>Github repository</p>
                    <p>© 2021 Takape</p>
                </footer>
            </div>
        </div>
    )
}