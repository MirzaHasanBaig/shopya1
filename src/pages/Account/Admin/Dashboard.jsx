import React,{useState,useEffect} from 'react'
import _ from 'lodash'
import { userRequest } from '../../../RequestMethods'
import {useSelector} from 'react-redux'
import { CChart } from '@coreui/react-chartjs'

function Dashboard() {
    const [data, setdata] = useState([]);
    const [data2, setdata2] = useState([]);
    const {currentUser} = useSelector((state) => state.user);
    useEffect(() => {
        const run = async()=>{
            const res = await userRequest.get("/order/income");
            const res2 = await userRequest.get("/users/stats");
            setdata(res.data);
            setdata2(res2.data)
        }
        run();
    }, []);
  return (
    <div>
        <h3 className="greeting mt-3 mb-3">
            Hello!&nbsp;<span className="text-dark font-weight-bold">{_.upperCase(currentUser.username)}</span>
        </h3>
        <div className='row'>
            <div className='col-sm-12 col-md-6'>
                <CChart type='line'
                data={{
                labels: [data[0]?._id,data[1]?._id,data[2]?._id,data[3]?._id,data[4]?._id,data[5]?._id,data[6]?._id,data[7]?._id,data[8]?._id,data[9]?._id,data[10]?._id,data[11]?._id],
                datasets: [
                    {
                    label:"Order Sells",
                    backgroundColor: 'rgba(179,181,198,0.2)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    tooltipLabelColor: 'rgba(179,181,198,1)',
                    data: [data[0]?.total,data[1]?.total,data[2]?.total,data[3]?.total,data[4]?.total,data[5]?._id,data[6]?._id,data[7]?._id,data[8]?._id,data[9]?._id,data[10]?._id,data[11]?._id]
                    }
                ],
                }}  
                options={{
                aspectRatio: 1.5,
                tooltips: {
                    enabled: true
                }
                }}></CChart>
                <h4 style={{textAlign:"center"}} className="mt-2">Order Analytics</h4>
            </div>
            <div className='col-sm-12 col-md-6'>
                <CChart type='line'
                data={{
                labels: [data2[0]?._id,data2[1]?._id,data2[2]?._id,data2[3]?._id,data2[4]?._id,data2[5]?._id,data2[6]?._id,data2[7]?._id,data2[8]?._id,data2[9]?._id,data2[10]?._id,data2[11]?._id],
                datasets: [
                    {
                    label:"Order Sells",
                    backgroundColor: 'red',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    tooltipLabelColor: 'rgba(179,181,198,1)',
                    data: [data2[0]?.total,data2[1]?.total,data2[2]?.total,data2[3]?.total,data2[4]?.total,data2[5]?._id,data2[6]?._id,data2[7]?._id,data2[8]?._id,data2[9]?._id,data2[10]?._id,data2[11]?._id]
                    }
                ],
                }}  
                options={{
                aspectRatio: 1.5,
                tooltips: {
                    enabled: true
                }
                }}></CChart>
                <h4 style={{textAlign:"center"}} className="mt-2">New User Analytics</h4>
            </div>
        </div>
        
    </div>
  )
}

export default Dashboard