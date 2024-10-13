import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import { getAgeGenderDistributionFn } from "api/ageGenderDistribution.api";

export default function AgeGenderChart() {
  const [ageGenderData, setAgeGenderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAgeGenderData = async () => {
      setIsLoading(true);

      try {
        const data = await getAgeGenderDistributionFn();
        setAgeGenderData(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchAgeGenderData();
  }, []);

  useEffect(() => {
    if (ageGenderData && ageGenderData.length > 0) {
      const labels = ageGenderData.map(group => group.ageGroup);
      const maleData = ageGenderData.map(group => group.maleCount);
      const femaleData = ageGenderData.map(group => group.femaleCount);
      let config = {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            //laki-laki
            {
              label: "Male",
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: maleData,
              fill: false,
              barThickness: 8,
            },
            //perempuan
            {
              label: "Female",
              fill: false,
              backgroundColor: "#ed64a6",
              borderColor: "#ed64a6",
              data: femaleData,
              barThickness: 8,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: "Orders Chart",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          legend: {
            labels: {
              fontColor: "rgba(0,0,0,.4)",
            },
            align: "end",
            position: "bottom",
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Age",
                },
                gridLines: {
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.3)",
                  zeroLineColor: "rgba(33, 37, 41, 0.3)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Value",
                },
                gridLines: {
                  borderDash: [2],
                  drawBorder: false,
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.2)",
                  zeroLineColor: "rgba(33, 37, 41, 0.15)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
          },
        },
      };
      let ctx = document.getElementById("bar-chart").getContext("2d");
      window.myBar = new Chart(ctx, config);
    }
  }, [ageGenderData]);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Distribution
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Age by Gender
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
