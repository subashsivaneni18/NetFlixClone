import React from 'react'

interface MobileMenuProps{
    visible?:boolean | null
}

const MobileMenu:React.FC<MobileMenuProps> = ({
    visible
}) => {

    const mobileMenuItems = [
        "Home",
        "Series",
        "Films",
        "New & Popular",
        "My List",
        "Browse by Languages"
    ]

    if(!visible)
    {
        return null;
    }
  return (
    <div className="bg-black absolute w-56 top-8 left-0 py-5 flex-col rounded-xl">
      <div className="flex flex-col gap-4 text-center">
        <p className="px-3 text-white  ">
          {mobileMenuItems.map((x: string) => (
            <div key={x} className="mb-1 transition rounded-lg hover:underline hover:bg-neutral-600">
              {x}
            </div>
          ))}
        </p>
      </div>
    </div>
  );
}

export default MobileMenu
