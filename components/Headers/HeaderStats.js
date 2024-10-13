import React, { useEffect, useState } from "react";

// components

import CardStats from "components/Cards/CardStats.js";
import { getCountFn } from "api/count.api";

export default function HeaderStats() {
  const [genderCount, setGenderCount] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGenderCount = async () => {
      setIsLoading(true)
      try {
        const data = await getCountFn();
        setGenderCount(data.genderCount);
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchGenderCount();
  }, []);
  const totalCount = genderCount.maleCount + genderCount.femaleCount;

  const malePercent = totalCount ? ((genderCount.maleCount / totalCount) * 100).toFixed(2) : 0;
  const femalePercent = totalCount ? ((genderCount.femaleCount / totalCount) * 100).toFixed(2) : 0;
  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="Male"
                  statTitle={genderCount.maleCount}
                  statArrow="down"
                  statPercent={malePercent}
                  statPercentColor="text-red-500"
                  statDescripiron="Lower"
                  statIconName="fa fa-male"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="FEMALE"
                  statTitle={genderCount.femaleCount}
                  statArrow="up"
                  statPercent={femalePercent}
                  statPercentColor="text-emerald-500"
                  statDescripiron="Higher"
                  statIconName="fa fa-female"
                  statIconColor="bg-red-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
