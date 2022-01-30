import Image from 'next/image'
import profilepic from "./../public/ankitzm.png"

export default function Home() {
  return (

      <div className="container px-6 py-4 lg:flex lg:h-128 lg:py-16 bg-yellow-400 items-center border-4 border-red-800">
        <div className="flex flex-col items-center w-full lg:flex-row lg:w-1/2">
          <div className="max-w-lg">
            <h1 className="text-xl tracking-wide text-gray-800 lg:text-4xl">Set your mdTitle</h1>
            <p className="mt-4 text-gray-600">Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Aut quia asperiores alias vero magnam recusandae adipisci ad vitae
            laudantium quod rem voluptatem eos accusantium cumque.</p>
            <div className="mt-6">
              <a href="#"
                className="inline-block px-3 py-2 font-semibold text-center text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400">
                Read More</a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full mt-2 lg:h-96 lg:w-1/2">
          <Image
            className="object-cover w-full max-w-2xl rounded-full lg:h-full divide-x-8"
            src={profilepic}
            alt="profile pic" />
      </div>
      
      </div>

  )
}
