import React from "react";
import { useState, useRef, useCallback } from "react";

import InputData from "../components/InputData";
import Header from "../components/Header";
import Chart from "../components/Chart";
import { toJpeg } from "html-to-image";

export default function Home() {
  const [data, setData] = useState([100, 200, 300]);
  const [labels, setLabels] = useState(["A", "B", "C"]);
  const [chartType, setChartType] = useState("pie");

  const ref = useRef<HTMLDivElement>(null);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toJpeg(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "chart.jpeg";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  const handleType = (typeBar: string) => {
    setChartType(typeBar);
  };

  return (
    <>
      <Header />
      <div className="w-full flex bg-gray-100 pt-[3.5%] min-h-screen gap-10">
        {/* Sidebar */}
        <aside className="w-1/4 border bg-slate-50 p-10 flex flex-col justify-between">
          <div>
            <select
              className="border rounded p-3 cursor-pointer w-full"
              onChange={(event) => handleType(event.target.value)}
              value={chartType}
            >
              <option value="" disabled>
                Select chart type
              </option>
              <option value="pie">Pie</option>
              <option value="line">Line</option>
              <option value="doughnut">Doughnut</option>
            </select>
          </div>

          <button
            onClick={onButtonClick}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span>Export</span>
          </button>
        </aside>

        {/* Main Content */}
        <div className="w-3/4 flex flex-col items-center p-10">
          {/* Input and Chart Side by Side */}
          <div className="w-full flex flex-row justify-center items-start space-x-10">
            {/* Input Data */}
              <InputData setData={setData} setLabels={setLabels} />

            {/* Chart */}
            <div className="bg-gray-50 w-2/3 p-4 shadow rounded-md" ref={ref}>
              <Chart data={data} labels={labels} chartType={chartType} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
