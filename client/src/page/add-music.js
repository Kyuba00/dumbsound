import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import NavHeader from "../component/navbar";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddMusic() {
const navigate = useNavigate()
    let {data: artis} = useQuery("ArtisChache", async() => {
        const response = await API.get('/artis')
        return response.data.data
    })

    // console.log(artis);
    
    const [form, setForm] = useState({
        title: "",
        years: "",
        thumbnail: "",
        singer: "",
        attache: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: 
            e.target.type === "file" ? e.target.files : e.target.value,
        })
    }

    const handleSubmit = useMutation( async(e) => {
        try {
            e.preventDefault()
            
            const config = {
                headers:{
                    'Content-type': 'multipart/form-data'
                }
            }

            const formData = new FormData()
            formData.set('title', form.title)
            formData.set('year', form.years)
            formData.set('thumbnail', form.thumbnail[0])
            formData.set('artis_id', form.singer)
            formData.set('attached', form.attache[0])

            console.log(formData);

            const response = await API.post('/music', formData, config)

            console.log(response);
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
    return (
        <>
            <NavHeader />
            <Container className="py-5 px-5">
                <Form className="d-flex flex-column gap-4" onSubmit={(e) => handleSubmit.mutate(e)}>
                    <h1 className="text-white text-bold">Add Music</h1>
                <Row>
                    <Col xs={9}>
                        <Form.Control type="text" placeholder="Title" name="title" onChange={handleChange} className="bg-dark text-white"/>
                    </Col>
                    <Col >
                    <Form.Control
                        type="file"
                        name="thumbnail"
                        id="thumbnail"
                        onChange={handleChange}
                        hidden
                    />
                    <label htmlFor="upload" className="customFile bg-dark text-center d-flex justify-content-between py-1 px-2 text-secondary gap-4" for="thumbnail" >
                        Attache Thumbnail
                        <span>
                            <Image src="../../icon/attache.png" className="me-2" alt="attach" width={15}/>
                        </span>
                    </label>
                    </Col>
                </Row>
                <Row>
                    <Col >
                    <Form.Control type="text" placeholder="Years" name="years" onChange={handleChange} className="bg-dark text-white"/>
                    </Col>
                    
                </Row>
                <Row>
                    <Col >
                    <Form.Select aria-label="Default select example" className="bg-dark text-white" name="singer" onChange={handleChange} >
                        <option hidden={true}>-- Choice Artist --</option>
                        {artis?.map((item, index) => 
                            <option value={item?.id} key={index}>{item?.name}</option>
                        )}
                    </Form.Select>
                    </Col>
                </Row>
                <Row className="w-25">
                <Col xs={6}>
                    <Form.Control
                        type="file"
                        name="attache"
                        id="attache"
                        onChange={handleChange}
                        hidden
                    />
                    <label htmlFor="upload" className="customFileAudio d-flex justify-content-center px-2 text-secondary gap-4 bg-dark" for="attache" >
                        Attache
                    </label>
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

export default AddMusic