import React from "react";

const Top = () => {
  const companies = [
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
    },
    {
      name: "YouTube",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/YouTube_social_white_square_%282017%29.svg/800px-YouTube_social_white_square_%282017%29.svg.png",
    },

    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/800px-Amazon_logo.svg.png",
    },
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/800px-Apple_logo_black.svg.png",
    },
    {
      name: "Meta",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/800px-Meta_Platforms_Inc._logo.svg.png",
    },
  ];

  return (
    <div className="flex flex-col items-center py-16 text-xl text-[#8590AA]">
      <div className="flex items-center w-full justify-between px-38">
        <hr className="flex-1 border-[#8590AA] h-0.5 mt-2" />
        <p className="text-[#8590AA] mx-8 text-2xl">Top companies hiring now</p>
        <hr className="flex-1 border-[#8590AA] h-0.5 mt-2" />
      </div>
      <div className="flex flex-wrap justify-center gap-8 mt-10 max-w-6xl mx-auto">
        {companies.map((company, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={company.logo}
              alt={company.name}
              className="h-16 object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150?text=Logo+Missing";
              }}
            />
            {/* <p className="mt-2 text-sm text-gray-600">{company.name}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top;