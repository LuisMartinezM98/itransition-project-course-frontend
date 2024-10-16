import { PieChart as MUIPieChart } from "@mui/x-charts/PieChart";

const PieChart = () => {
  return (
    <MUIPieChart
      series={[
        {
          data: [
            { id: 1, value: 10, label: 'series A' },
            { id: 2, value: 25, label: 'series B' },
            { id: 3, value: 20, label: 'series C' },
          ],
        },
      ]}
      width={400} 
      height={200}
    />
  );
}

export default PieChart;
