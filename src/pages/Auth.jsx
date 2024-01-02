import { useState } from 'react'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup} from "firebase/auth";
import { auth, googleProvider } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Auth = () => {

  const [signup,setSignup] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false); 
// form gonderildiginde
  const handleSubmit = (e) => {
    e.preventDefault();
// formdaki degerlere erisme
      const mail = e.target[0].value;
      setEmail(mail);
      const pass = e.target[1].value;

      if(signup){
        // create account
        createUserWithEmailAndPassword(auth,mail,pass)
        .then(()=> {
          navigate("/feed");
          toast.success("Your account has been created");
        })
        .catch((err)=> {
          toast.error(`Sorry...an error occurred : ${err.code}`);
        })
      } else {
        // sign in
        signInWithEmailAndPassword(auth, mail,pass)
        .then(()=> {
          navigate("/feed");
          toast.success("You've logged in to your acoount")
        })
        .catch((err) => {
          // giris bilgileri yanlissa bunu state`e aktar
          if(err.code === 'auth/invalid-credential') {
            setIsError(true);
          }
          toast.error(`Sorry..an error occurred: ${err.code}`)
        })
      }

  }

// sifre sifirlama
const handlePassReset = () => {
  sendPasswordResetEmail(auth, email)
  .then(() => toast.info("Password reset email sent!"))
 
}
// Sign in with google
const handleGoogle = () => {
  signInWithPopup(auth, googleProvider)
  .then(()=> {
    navigate("/feed")
    toast.success("You have logged in with your Google account!")
  })
}

  return (
    <section className='h-screen bg-zinc-700 grid place-items-center'>
      <div className='bg-black text-white flex flex-col gap-10 py-16 px-32 rounded-lg'>
       <div className='flex justify-center'>
        <img className='h-[70px]' src="/x-logo.png" />
       </div>
       <h1 className='text-center font-bold text-xl'>Join Twitter!</h1>
       
       <div onClick={handleGoogle} className='flex items-center bg-white rounded-full cursor-pointer py-2 px-10 gap-3 hover:bg-gray-300'>
        <img className='h-[25px]' src="/g-logo.png" />
        <span className='text-black'>{signup ? "Sign up" : "Sign in"} with Google</span>
       </div>

       <div className='flex items-center bg-white rounded-full cursor-pointer py-2 px-10 gap-1 hover:bg-gray-300'>
       <img className='h-[25px]' src="/a-logo.png" />
        <span className='text-black font-bold'>{signup ? "Sign up" : "Sign in"} with Apple</span>
       </div>
       <h3 className='relative top-[50px] bg-black w-28 text-center ml-20'>or</h3>
       <hr />
      
      
       <form onSubmit={handleSubmit} className='flex flex-col'>
       
        <label>E-mail</label>
        <input
        autoComplete='e-mail'
        className='text-black mt-1 rounded p-2 shadow-lg ' type="e-mail" />
        
        <label className='mt-5'>Password</label>
        <input
        autoComplete='password'
        className='text-black mt-1 rounded p-2 shadow-lg ' type="password" />
        
        <button className='bg-white text-black rounded-full font-bold p-1 mt-10 transition hover:bg-gray-300'>
          {signup ? "Sign up" : "Sign in"}
          </button>
        
        <p className='mt-5'> 
          <span className='text-gray-500 me-2'>
            {signup ? "Don`t have an account?" : "Already have an account?"}
            </span>
          <span onClick={() => setSignup(!signup)} className='cursor-pointer text-blue-500'>
           {signup ? "Sign in" : "Sign up"}
            </span> 
        </p>
        {/* hata varsa */}
        {isError && !signup && (<p onClick={handlePassReset} className='text-red-500 mt-4 cursor pointer'>
          Forgot password?
        </p>)}
       </form>
        </div>
    </section>
  )
}

export default Auth