import useCurrentUser from '@/hooks/useCurrentUser'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'


export async function getServerSideProps(context:NextPageContext)
{
    const session = await getSession(context)
    if(!session?.user?.email)
    {
        return{
            redirect:{
                destination:'/auth',
                permanent:false
            }
        }
    }

    return{
        props:{}
    }

}

const Profiles = () => {

    const {data:user} = useCurrentUser()

    const router = useRouter()

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col ">
        <p className="text-3xl text-white md:text-6xl text-center gap-8 mt-10">
          Who is Watching ?
        </p>
        <div onClick={() => router.push('/')}>
          <div className="group flex-row w-44 mx-auto mt-6">
            <div
              className="
                 rounded-md
                 flex
                 items-center
                 justify-center
                 border-2
                 border-transparent
                 group-hover:cursor-pointer
                 group-hover:border-white
                 w-44
                 h-44
                "
            >
              <img src="/images/default-blue.png" alt="pic" />
            </div>
            <div
              className="
                    mt-4
                    text-gray-400
                    text-2xl
                    text-center
                    group-hover:text-white
                    "
            >
              {user?.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profiles
