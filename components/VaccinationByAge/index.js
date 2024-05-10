// Write your code here
import './index.css'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByGender = props => {
  const {data} = props
  console.log(data)
  return (
    <>
      <h1 className="by-age-heading">Vaccination by Age</h1>
      <ResponsiveContainer
        width="100%"
        height={300}
        className="pie-chart-container"
      >
        <PieChart>
          <Pie
            cx="70%"
            cy="40%"
            data={data}
            startAngle={0}
            endAngle={360}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="18-44" fill="#2d87bb" />
            <Cell name="44-60" fill="#a3df9f" />
            <Cell name="60 Above" fill="#64c2a6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}
export default VaccinationByGender
