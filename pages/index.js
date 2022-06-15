import Image from 'next/image'
import profilepic from "./../public/ankitzm.png"
import Data from "./../data/data.json"

export default function Home() {
  const Name = Data.name;
  const About = Data.about;

  return (
    <div className='flex flex-col-reverse sm:flex-row items-center content-center'>
      <div className="flex flex-col w-full lg:w-1/2">
        <h1 className="text-xl tracking-wide text-gray-800 lg:text-4xl">{Name}</h1>
        <p className="mt-4 text-gray-600">{About}</p>
        <div className="mt-6">
          <a href="#"
            className="inline-block px-3 py-2 font-semibold text-center text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400">
            Read More</a>
        </div>
      </div>
      <div className="flex items-center justify-center w-full mt-2 lg:h-96 lg:w-1/2 box-content">
        <Image
          className="object-cover w-full max-w-2xl rounded-full lg:h-full divide-x-8"
          src={profilepic}
          alt="profile pic" />
      </div>
    </div>
  )
}
