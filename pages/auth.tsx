import Input from '@/components/Input';
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import axios from 'axios'
import {signIn} from 'next-auth/react'
import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa'

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState<"Login" | "Register">("Login");


const auth = () => {


    const onToggle = useCallback(()=>{
        setVariant((e)=>e==='Login'?'Register':'Login')
    },[setVariant])

   

     const login = useCallback(async () => {
       try {
         await signIn("credentials", {
           email,
           password,
           callbackUrl: "/Profiles",
         });
         
       } catch (error) {
         console.log(error);
       }
     }, [email, password]);

    const register = useCallback(async()=>{
        try {
          await axios.post('/api/register',{
            email,
            password,
            name
          })
          login()
        } catch (error) {
          console.log(error)
        }
    },[email,name,password,login])

   

  return (
    <div className="w-full h-full relative bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="h-full w-full bg-black lg:bg-opacity-50">
        <nav className="px-12 py-5 ">
          <Image src="/images/logo.png" width={200} height={200} alt="Logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-80  self-center px-16 py-16 mt-2 lg:w-2/5 rounded-md w-full">
            <h2 className="font-semibold text-white text-4xl mb-8">
              {variant === "Login" ? "Login" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "Register" && (
                <Input
                  label="username"
                  onChange={(e: any) => setName(e.target.value)}
                  id="name"
                  type="text"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(e: any) => setEmail(e.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e: any) => setPassword(e.target.value)}
                id="password"
                type="password"
                value={password}
              />
              <button
                className="
               text-white
               bg-red-600
               py-3
               rounded-md
               mt-10
               w-full
               hover:bg-red-700
               transition
              "
                onClick={variant === "Login" ? login : register}
              >
                {variant === "Login" ? "Login" : "Register"}
              </button>

              <div className="flex justify-center items-center mt-8 gap-4">
                <div 
                onClick={()=>signIn('github',{callbackUrl:'/Profiles'})}
                className="
                 h-10
                 w-10
                 bg-white
                 flex
                 items-center
                 justify-center
                 rounded-full
                 cursor-pointer
                 hover:opacity-70
                 transition
                ">
                  <FaGithub size={24} />
                </div>
                <div 
                onClick={()=>signIn('google',{callbackUrl:'/Profiles'})}
                className=" 
                 h-10
                 w-10
                 bg-white
                 flex
                 items-center
                 justify-center
                 rounded-full
                 cursor-pointer
                 hover:opacity-70
                 transition
                ">
                  <FcGoogle size={24} />
                </div>
              </div>


              <p className="mt-12 text-neutral-500">
                {variant === "Login"
                  ? " First Time Using Netflix ?"
                  : "Already have an Account"}
                <span
                  onClick={onToggle}
                  className="text-white hover:underline cursor-pointer ml-1"
                >
                  {variant === "Login" ? "Create an account" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default auth
