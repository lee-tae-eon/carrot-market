import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="grid gap-10 px-10 py-20 bg-slate-400">
      <div className="p-6 bg-white shadow-xl rounded-2xl">
        <span className="text-3xl font-semibold">Select Item</span>
        <div className="flex justify-between my-2">
          <span className="text-gray-500">Grey Chair</span>
          <span className="font-semibold ">$19</span>
        </div>
        <div className="flex justify-between pt-2 mt-2 border-t-2 border-dashed">
          <span className="text-gray-500">Total</span>
          <span className="font-semibold">$10</span>
        </div>
        <div className="w-2/4 p-3 mx-auto mt-5 font-semibold text-center text-white bg-blue-500 rounded-xl">
          Checkout
        </div>
      </div>
      <div className="p-10 bg-white shadow-xl rounded-2xl"></div>
      <div className="p-10 bg-white shadow-xl rounded-2xl"></div>
      <div className="p-10 bg-white shadow-xl rounded-2xl"></div>
    </div>
  );
};

export default Home;
