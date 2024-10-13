import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import { getCountFn } from "api/count.api";

export default function ProfessionByGenderChart() {
  const [professionByGender, setProfessionByGender] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfessionByGender = async () => {
      setIsLoading(true);

      try {
        const data = await getCountFn();
        const professionByGender = data.professionByGender
        setProfessionByGender(professionByGender);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    fetchProfessionByGender();
  }, []);

  useEffect(() => {
    if (professionByGender && professionByGender.length > 0) {
      const labels = professionByGender.map(item => item._id.profession);
      const maleProfessionData = labels.map(label =>
        professionByGender.find(item => item._id.profession === label && item._id.gender === 'Male')?.count || 0
      );
      const femaleProfessionData = labels.map(label =>
        professionByGender.find(item => item._id.profession === label && item._id.gender === 'Female')?.count || 0
      );
      console.log(labels, maleProfessionData, femaleProfessionData)
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
              data: maleProfessionData,
              fill: false,
              barThickness: 8,
            },
            //perempuan
            {
              label: "Female",
              fill: false,
              backgroundColor: "#ed64a6",
              borderColor: "#ed64a6",
              data: femaleProfessionData,
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
                  labelString: "Profession",
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
      let ctx = document.getElementById("bar-chart-profession-by-gender").getContext("2d");
      window.myBar = new Chart(ctx, config);
    }
  }, [professionByGender]);
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
                Profession by Gender
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart-profession-by-gender"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
