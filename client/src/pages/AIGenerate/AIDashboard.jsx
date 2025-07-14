import React, { useState } from "react";
import { dummyCreationData } from "../../assets/assets.js";

const AIDashboard = () => {
  const [selectedArticle, setSelectedArticle] = useState("");

  return (
    <div className="mx-auto container p-4 space-y-5">
      <div className="card flex items-center w-64 !px-6">
        <div className="text-lg font-medium space-y-2 w-full">
          <p>Total Creations</p>
          <p>6</p>
        </div>
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-sparkles w-5 text-white"
            aria-hidden="true">
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
            <path d="M20 3v4"></path>
            <path d="M22 5h-4"></path>
            <path d="M4 17v2"></path>
            <path d="M5 18H3"></path>
          </svg>
        </div>
      </div>

      {/* Recent Creations */}
      <p>Recent Creations</p>

      {dummyCreationData.map((create) => (
        <div className="card sm:px-6 max-sm:!pl-6" key={create.id}>
          <div className="w-full">
            <button
              onClick={() => setSelectedArticle(create.id)}
              className="btn-primary float-right !rounded-2xl !text-sm sm:px-5 m-2">
              Article
            </button>
            <p>{create.prompt}</p>
            <p className="text-gray-500">{create.created_at}</p>
          </div>
          {create.id === selectedArticle && <div>{create.content}</div>}
        </div>
      ))}
    </div>
  );
};

export default AIDashboard;
