import type { NextPage } from "next";
import Layout from "../../components/layout";

const Create: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="px-4 py-10 space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            name
          </label>
          <div className="flex items-center rounded-md shadow-sm">
            <input
              id="name"
              type="text"
              className="w-full py-2 placeholder-gray-300 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 px3"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="price"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <div className="relative flex items-center rounded-md shadow-sm">
            <div className="absolute left-0 flex items-center justify-center pl-3 pointer-events-none">
              <span className="text-sm text-gray-500">$</span>
            </div>
            <input
              id="price"
              type="text"
              placeholder="0.00"
              className="w-full py-2 placeholder-gray-300 border border-gray-300 rounded-md shadow-sm appearance-none pl-7 focus:outline-none focus:ring-orange-500 focus:border-orange-500 px3"
            />
            <div className="absolute right-0 flex items-center pr-3 pointer-events-none ">
              <span className="text-gray-500">USD</span>
            </div>
          </div>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-orange-500"
            rows={4}
          />
        </div>
        <button className="w-full px-3 py-3 mt-4 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md shadow-sm hover:bg-orange-600 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
          Go Live
        </button>
      </div>
    </Layout>
  );
};

export default Create;
