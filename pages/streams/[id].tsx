import type { NextPage } from "next";

const StreamDetail: NextPage = () => {
  return (
    <div>
      <div className="px-3 pt-10 space-y-4 ">
        <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
        <div className="mt-2">
          <h1 className="text-3xl font-bold text-gray-900">Galaxy S50</h1>
          <span className="mt-6 text-xl text-gray-900">$140</span>
          <p className="my-6 text-base text-gray-800">
            My money&apos;s in that office, right? If she start giving me some
            bullshit about it ain&apos;t there, and we got to go someplace else
            and get it, I&apos;m gonna shoot you in the head then and there.
            Then I&apos;m gonna shoot that bitch in the kneecaps, find out where
            my goddamn money is. She gonna tell me too. Hey, look at me when
            I&apos;m talking to you, motherfucker. You listen: we go in there,
            and that ni**a Winston or anybody else is in there, you the first
            motherfucker to get shot. You understand?
          </p>
        </div>
      </div>
      <div className="px-3">
        <h3 className="text-xl font-bold">Live Chat</h3>
      </div>
      <div className="px-4 pb-16 mt-10 space-y-4 h-[50vh] overflow-y-scroll">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-slate-400" />
          <div className="w-1/2 p-2 text-sm text-gray-700 border border-gray-300 rounded-md">
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>
        <div className="flex flex-row-reverse items-center space-x-2 space-x-reverse">
          <div className="w-8 h-8 rounded-full bg-slate-400" />
          <div className="w-1/2 p-2 text-sm text-gray-700 border border-gray-300 rounded-md">
            <p>I wnat 2000 won</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-slate-400" />
          <div className="w-1/2 p-2 text-sm text-gray-700 border border-gray-300 rounded-md">
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>
        <div className="flex flex-row-reverse items-center space-x-2 space-x-reverse">
          <div className="w-8 h-8 rounded-full bg-slate-400" />
          <div className="w-1/2 p-2 text-sm text-gray-700 border border-gray-300 rounded-md">
            <p>I wnat 2000 won</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-slate-400" />
          <div className="w-1/2 p-2 text-sm text-gray-700 border border-gray-300 rounded-md">
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>
        <div className="flex flex-row-reverse items-center space-x-2 space-x-reverse">
          <div className="w-8 h-8 rounded-full bg-slate-400" />
          <div className="w-1/2 p-2 text-sm text-gray-700 border border-gray-300 rounded-md">
            <p>I wnat 2000 won</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-slate-400" />
          <div className="w-1/2 p-2 text-sm text-gray-700 border border-gray-300 rounded-md">
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>
        <div className="flex flex-row-reverse items-center space-x-2 space-x-reverse">
          <div className="w-8 h-8 rounded-full bg-slate-400" />
          <div className="w-1/2 p-2 text-sm text-gray-700 border border-gray-300 rounded-md">
            <p>I wnat 2000 won</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-slate-400" />
          <div className="w-1/2 p-2 text-sm text-gray-700 border border-gray-300 rounded-md">
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>
        <div className="flex flex-row-reverse items-center space-x-2 space-x-reverse">
          <div className="w-8 h-8 rounded-full bg-slate-400" />
          <div className="w-1/2 p-2 text-sm text-gray-700 border border-gray-300 rounded-md">
            <p>I wnat 2000 won</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-slate-400" />
          <div className="w-1/2 p-2 text-sm text-gray-700 border border-gray-300 rounded-md">
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>
        <div className="flex flex-row-reverse items-center space-x-2 space-x-reverse">
          <div className="w-8 h-8 rounded-full bg-slate-400" />
          <div className="w-1/2 p-2 text-sm text-gray-700 border border-gray-300 rounded-md">
            <p>I wnat 2000 won</p>
          </div>
        </div>
      </div>
      <div className="fixed inset-x-0 w-full max-w-md mx-auto bottom-4">
        <div className="relative flex items-center">
          <input
            type="text"
            className="w-full pr-12 border-gray-300 rounded-full shadow-sm focus:ring-orange-500 focus:outline-none focus:border-orange-500"
          />
          <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
            <button className="flex items-center px-3 text-sm text-white bg-orange-500 rounded-full cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 hover:bg-orange-600">
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamDetail;
