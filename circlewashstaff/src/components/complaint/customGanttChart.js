import { Chart } from "react-google-charts";
import React, { useEffect, useState} from 'react';

export default function CustomGanttChart({ganttData}){
    const [row, setRow] = useState();

    useEffect(() => {
        const gantt = mapGanttData();
        setRow(gantt);
    }, [])

    const columns = [
        { type: "string", id: "code" },
        { type: "string", id: "Message" },
        { type: "date", id: "Start" },
        { type: "date", label: "End" },
    ];

    const mapGanttData = () => {
        const data = ganttData.map((d) => {
            return [`${d.message}`, `${d.message}`, new Date(d.startTime), new Date(d.endTime)];
        })
        return data;
    }

    const options = {
        height: 170,
      };

    return (
        (row) ? (
        <Chart
            chartType="Timeline"
            width="100%"
            height="100%"
            data={[columns, ...row]}
            options={options}/>) : 
        (<h1> loading... </h1>)
    );
}