import React, {useState, useEffect} from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function CustomPie({data}){
    const [filteredData, setFilteredData] = useState();
    const Colors = ['#D7D5EA', '#757575', '#ADD45B', '#57C785', '#0088FE', '#EDDD53', '#C70039', '#501849', '#FF8C1A', '#FF5733'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const customPieData = () => {
        let collectData = []
        const label = ['offline', "disabled", "idle", "running", "diagnostic", "deuplicate", "error", "firmwareDoesntExist", "satellite", "reader"];
        for(let i = 0; i < 10; i++){
            const name = label[i];
            const value = data[label[i]];
            collectData.push({name: name, value: value});
        }
        setFilteredData(collectData);
    }
    
    useEffect(() => {
        customPieData()
    }, [])


    return (
        (filteredData) ? (<ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
                data={filteredData.filter((d) => d.value > 0)}
                cx="50%"
                cy="35%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                dataKey="value"
            >
              {filteredData.map((entry, index) => (  
                  (entry.value !== 0) && (<Cell key={`cell-${index}`} fill={Colors[index]} />)
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>) : (<h1> loading... </h1>)
    );
}