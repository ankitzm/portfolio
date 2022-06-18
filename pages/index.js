import Image from 'next/image'
import profilepic from "./../public/ankitzm.png"
import Data from "./../data/data.json"
import { github, medium, linkedin, twitter } from "./../public/icon"

export default function Home() {
  const Name = Data.name;
  const About = Data.about;

  return (
    <div className='flex flex-col-reverse sm:flex-row  items-center content-center'>
      <div className="flex flex-col w-full lg:w-1/2 py-8">
        <h1 className="text-4xl sm:text-3xl md:text-6xl tracking-wide text-gray-800" style={{ "fontFamily": 'righteous' }}>
          {Name}
        </h1>
        <p className="mt-4 text-gray-600 text-lg lg:text-xl">
          {About}
        </p>
        <div className="mt-6 text-lg lg:text-xl">
          Stalk me ↴
          <div className='flex gap-4 ml-4 mt-2 opacity-85'>
            <a href="https://twitter.com/ankitzm" target="_blank" rel='noreferrer'>
              <Image src={twitter} alt="" width={30} height={30} />
            </a>
            <a href="https://medium.com/@ankitzm" target="_blank" rel='noreferrer'>
              <Image src={medium} alt="" width={30} height={30} />
            </a>
            <a href="https://www.linkedin.com/in/ankitzm/" target="_blank" rel='noreferrer'>
              <Image src={linkedin} alt="" width={30} height={30} />
            </a>
            <a href="https://github.com/ankitzm" target="_blank" rel='noreferrer'>
              <Image src={github} alt="" width={30} height={30} />
            </a>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full mt-2 lg:h-96 lg:w-1/2 box-content">
        <Image
          className="w-full max-w-2xl rounded-full lg:h-full"
          src={profilepic}
          alt="profile pic" />
      </div>
    </div>
  )
}
