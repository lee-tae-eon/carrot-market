import { NextPage } from "next";

const Chats: NextPage = () => {
  return (
    <div className="py-10 divide-y-[1px]">
      {[1, 2, 3, 4].map((_, i) => (
        <div
          key={i}
          className="flex px-4 py-3 mt-1 space-x-3 cursor-pointer items-starts-center"
        >
          <div className="w-12 h-12 rounded-full bg-slate-300" />
          <div>
            <p className="text-gray-700 ">Steve Jebs</p>
            <p className="text-sm font-medium text-gray-500">
              See you tomorrow in the corner at 2pm!
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;