import { NextPage } from "next";

const ChatDetail: NextPage = () => {
  return (
    <div className="px-4 py-10 space-y-4">
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
      <div className="flex items-center space-x-2 ">
        <div className="w-8 h-8 rounded-full bg-slate-400" />
        <div className="w-1/2 p-2 text-sm text-gray-700 border border-gray-300 rounded-md">
          <p>Are you insane?</p>
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

export default ChatDetail;
