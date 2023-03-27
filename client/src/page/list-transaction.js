import { Container, Dropdown, Image, Table } from "react-bootstrap";
// import './navbar.module.css'
import NavHeader from "../component/navbar";
import { useMutation} from "react-query";
import { API } from "../config/api";
import { useEffect, useState } from "react";
// function NextDay() {
//     const start = new Date()

//     start.setDate(start.getDay() + 7)

//     return start.getDay()
// }
//     const nextday = NextDay()

//     const endTime = new Date(nextday, 0,909,0,0).getTime()  

//     const now = new Date()

//     const remainingTime = endTime - now.getTime();

//     const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

//     console.log(days);


    // export function timeLeft() {
    //     const now = new Date();
      
    //     const remainingTime = endTime - now.getTime();
      
    //     const seconds = Math.floor((remainingTime / 1000) % 60);
    //     const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    //     const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
      
    //     const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      
    //     return { days, hours, minutes, seconds };
    //   }

    // console.log(endTime);

function ListTransaction() {
    const [transaction, setTransaction] = useState([])
    async function GetTransaction (){
        const response = await API.get('/transaction')
        setTransaction(response.data.data)
    }
// console.log(data);
    const HandleUpdateStatus = useMutation( async(id) => {
        try {
           const formData = new FormData()
           formData.set('subscribe', "premium")
            
           const response = await API.patch(`/user/${id}`, formData)
            // console.log(response);
        } catch (error) {
        console.log(error);
        }
    } )
    const HandleUpdateStatusCancel = useMutation( async(id) => {
        try {
           const formData = new FormData()
           formData.set('subscribe', null)
           const response = await API.patch(`/user/${id}`, formData)

           GetTransaction()
            // console.log(response);
        } catch (error) {
            
        }
    } )

    useEffect(() => {
        GetTransaction()
    },[transaction])
    
    return ( 
        <>
            <NavHeader /> 
            <Container className="mt-5 overflow-scroll">
                <Table striped hover variant="dark" size="lg">
                <thead style={{height:  90, color:'#EE4622'}} className="text-left align-middle ">
                    <tr >
                        <th>No</th>
                        <th>Users</th>
                        <th>Remaining Active</th>
                        <th>Status User</th>
                        <th>Status Payment</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody >
                    {transaction?.map((list, index) => 
                        <tr  style={{height:  70}} className="text-left align-middle" key={list.id}>
                            <td>{index + 1}</td>
                            <td>{list.user?.fullname}</td>
                            <td>30 / Hari</td>
                            {list.user.subscribe === "premium" ? 
                                <td className="text-success">Active</td> : <td className="text-danger">No Actice</td>
                            }
                            {list?.status === "success" ? 
                                <td className="text-success">Success</td> : <td className="text-danger">Cancel</td>
                            }
                            <td>    
                            <Dropdown>
                            <Dropdown.Toggle className='bg-transparent' style={{border: 'none', display:''}} >
                                <Image style={{cursor:'pointer'}} src="../../icon/icon-action.png"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="bg-dark text-center w-50">
                                <Dropdown.Item className="text-success" onClick={() => HandleUpdateStatus.mutate(`${list.user.id}`)}>Approve</Dropdown.Item>
                                <Dropdown.Item className="text-danger" onClick={() => HandleUpdateStatusCancel.mutate(`${list.user.id}`)} >Cancel</Dropdown.Item>
                            </Dropdown.Menu>
                            </Dropdown>
                            </td>
                        </tr>
                    )}
                </tbody>
                </Table>
            </Container>
        </>
    )
}

export default ListTransaction