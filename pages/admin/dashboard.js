import React from "react";

// components

import ProfessionCountChart from "components/Cards/ProfessionCount";
import AgeGenderChart from "components/Cards/AgeGenderChart.js";
import ProfessionByGenderChart from "components/Cards/ProfessionByGenderChart";

// layout for page

import Admin from "layouts/Admin.js";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
          <ProfessionCountChart />
        </div>
        <div className="w-full xl:w-6/12 px-4">
          <AgeGenderChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-full mb-12 xl:mb-0 px-4">
          <ProfessionByGenderChart />
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;
