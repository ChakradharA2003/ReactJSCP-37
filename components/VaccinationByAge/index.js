// Write your code here
import './index.css'
import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByGender = props => {
  const {data} = props
  console.log(data)
  return (
    <>
      <h1 className="by-age-heading">Vaccination by Age</h1>
      
        <PieChart width={1000} height={300}>
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
      
    </>
  )
}
export default VaccinationByGender
