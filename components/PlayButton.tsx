import { useRouter } from 'next/router'
import React from 'react'
import { BsPlayFill } from 'react-icons/bs'

interface PlayButtonProps{
    movieId:string
}

const PlayButton:React.FC<PlayButtonProps> = ({
    movieId
}) => {

    const router = useRouter()

  return (
    <div onClick={()=>router.push(`/watch/${movieId}`)}>
      <p
        className="
              cursor-pointer
             bg-white
              text-black
              mt-1
              py-1
              md:py-2
              px-2
              md:px-3
              rounded-lg
              hover:bg-opacity-50
              transition
              font-bold
              flex
              items-center
              gap-1"
      >
        <BsPlayFill/>
        play
      </p>
    </div>
  );
}

export default PlayButton
