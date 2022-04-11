import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col p-5 space-y-2">
      <details className="select-none open:text-white open:bg-indigo-400">
        <summary className="cursor-pointer">What is my fav food.</summary>
        <span className="selection:bg-indigo-500 selection:text-white">
          coding
        </span>
      </details>
    </div>
    // <form className="flex flex-col p-5 space-y-2 ">
    //   <input
    //     type="text"
    //     required
    //     placeholder="UserName"
    //     className="p-1 border border-gray-400 rounded-md peer"
    //   />
    //   <span className="hidden peer-invalid:text-red-500 peer-invalid:block">
    //     This input is invalid
    //   </span>
    //   <span className="hidden peer-valid:text-teal-500 peer-valid:block">
    //     good choice
    //   </span>
    //   <input type="submit" value="Login" className="bg-white" />
    // </form>
    // <div className="grid min-h-screen gap-10 px-10 py-20 bg-slate-400">
    //   <div className="p-6 bg-white shadow-xl rounded-2xl">
    //     <span className="text-3xl font-semibold">Select Item</span>
    //     <ul>
    //       {[1, 2, 3, 4, 5].map((i) => (
    //         <div
    //           key={i}
    //           className="flex justify-between my-2 odd:bg-blue-500 even:bg-yellow-300"
    //         >
    //           <span className="text-gray-500">Grey Chair</span>
    //           <span className="font-semibold ">$19</span>
    //         </div>
    //       ))}
    //     </ul>
    //     {["a", "b", "c", ""].map((c, i) => (
    //       <li className="py-2 bg-red-500 empty:hidden" key={i}>
    //         {c}
    //       </li>
    //     ))}
    //     <div className="flex justify-between pt-2 mt-2 border-t-2 border-dashed">
    //       <span className="text-gray-500">Total</span>
    //       <span className="font-semibold">$10</span>
    //     </div>
    //     <button className="block w-1/2 p-3 mx-auto mt-5 font-semibold text-center text-white transition-all bg-blue-500 rounded-xl hover:bg-teal-500 active:bg-yellow-500">
    //       Checkout
    //     </button>
    //   </div>

    //   <div className="overflow-hidden bg-white shadow-xl rounded-2xl group">
    //     <div className="p-6 bg-blue-500 pb-14">
    //       <span className="text-2xl text-white ">Profile</span>
    //     </div>
    //     <div className="relative p-6 bg-white rounded-3xl -top-5">
    //       <div className="relative flex items-end justify-between -top-16">
    //         <div className="flex flex-col items-center ">
    //           <span className="text-sm text-gray-500">Orders</span>
    //           <span className="font-medium">340</span>
    //         </div>
    //         <div className="w-24 h-24 transition-colors bg-red-400 rounded-full group-hover:bg-red-300"></div>
    //         <div className="flex flex-col items-center ">
    //           <span className="text-sm text-gray-500">Spent</span>
    //           <span className="font-medium">640</span>
    //         </div>
    //       </div>

    //       <div className="relative flex flex-col items-center -mt-10 -mb-5">
    //         <span className="text-lg font-medium">Tony Molloy</span>
    //         <span className="text-sm text-gray-400">미국</span>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="p-6 bg-white shadow-xl rounded-2xl">
    //     <div className="flex items-center justify-between mb-4">
    //       <span>⬅️</span>
    //       <div className="space-x-3">
    //         <span>⭐️4.9</span>
    //         <span className="p-2 rounded-md shadow-xl">❤️</span>
    //       </div>
    //     </div>
    //     <div className="mb-5 bg-zinc-400 h-72"></div>
    //     <div className="flex flex-col">
    //       <span className="text-xl font-medium">Swoon Lounge</span>
    //       <span className="text-xs text-gray-500">Chair</span>
    //       <div className="flex items-center justify-between mt-3 mb-4">
    //         <div className="space-x-2">
    //           <button className="w-5 h-5 transition bg-yellow-500 rounded-full focus:ring-2 ring-offset-1 ring-yellow-500" />
    //           <button className="w-5 h-5 transition bg-indigo-500 rounded-full focus:ring-2 ring-offset-1 ring-indigo-500" />
    //           <button className="w-5 h-5 transition bg-teal-500 rounded-full focus:ring-2 ring-offset-1 ring-teal-500" />
    //         </div>
    //         <div className="flex items-center gap-1">
    //           <button className="flex items-center justify-center text-xs font-medium bg-blue-200 rounded-lg aspect-square w-7">
    //             -
    //           </button>
    //           <span>1</span>
    //           <button className="flex items-center justify-center text-xs font-medium bg-blue-200 rounded-lg aspect-square w-7">
    //             +
    //           </button>
    //         </div>
    //       </div>
    //       <div className="flex items-center justify-between">
    //         <span className="text-2xl font-medium">$450</span>
    //         <button className="p-2 px-8 text-xs text-center text-white bg-blue-500 rounded-lg">
    //           Add to cart
    //         </button>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="p-6 bg-white shadow-xl rounded-2xl"></div>
    // </div>
  );
};

export default Home;
