import { useState }  from "react"
import { useMutation } from "react-query"
import { API } from "../config/api"
import NavHeader from "../component/navbar"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

function AddArtist() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        old: "",
        type: "",
        startcarer: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = useMutation( async(e) => {
    try {
        e.preventDefault()
        
        // const config = {
        //     headers: {
        //         'Content-type': 'application/json'
        //     }
        // }


        const formData = new FormData()
        formData.set('name', form.name)
        formData.set('old', form.old)
        formData.set('type', form.type)
        formData.set('startcarer', form.startcarer)
        console.log(formData);

        const response = await API.post('/artis', formData)

        // console.log(response);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Berhasil',
            showConfirmButton: false,
            timer: 1500
          })
    } catch (error) {
        console.log(error);
    }

    setInterval(() => {
        navigate(0)
    },1000)
    })
    return(
        <>
        <NavHeader />
            <Container className="py-5 px-5">
                <Form className="d-flex flex-column gap-4" onSubmit={(e) => handleSubmit.mutate(e)}>
                    <h1 className="text-light">Add Artist</h1>
                <Row>
                    <Col>
                        <Form.Control placeholder="Name" type="text" className="bg-dark text-white" name="name" onChange={handleChange}/>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <Form.Control placeholder="Old" className="bg-dark text-white" type="number" name="old" onChange={handleChange}/>
                    </Col>
                </Row>
                <Row>
                    <Col >
                    <Form.Select aria-label="Default select example" name="type" onChange={handleChange} className="bg-dark text-white">
                        <option hidden={true}>-- Choice Type --</option>
                        <option value="indie">Indie</option>
                        <option value="solo">Solo</option>
                        <option value="group">Group</option>
                    </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <Form.Control placeholder="Start a Career" type="text"  name="startcarer" onChange={handleChange} className="bg-dark text-white"/>
                    </Col>
                </Row>
                <div className="text-center">
                    <Button className="btn-orange-pay w-25 mt-5" type="submit">Submit</Button>
                </div>
                </Form>
            </Container>
        </>
    )
}


export default AddArtist