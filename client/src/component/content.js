import { Card, Col, Container, Navbar, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { useContext, useState } from "react";
import AudioPlay from "./audio/AudioPlayer";
import { UserContext } from "../context/UserContext";
import ModalLogin from "./auth/modal-login";
import ModalSubs from "./modal/subscribe";

function Content () {
    const [state] = useContext(UserContext)
    // console.log(state);
    let { data: music } = useQuery('cacheMusic', async() => {
      const response = await API.get('/musics')
      return response.data.data
    })
    

    const [smShow, setSmShow] = useState(false);
    const [showMusic, setShowMusic] = useState(false)
    const [hideMusic, setHideMusic] = useState(true)
    // console.log(showMusic);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const handleShow = () => setShowMusic(true)
    // console.log(music);

    return (
        <>
        <Container style={{marginBottom:150}}>
          <Row>
            <Col>
            <h1 style={{color:'#EE4622'}} className="text-center fw-bold mt-5 fs-4">Dengarkan Dan Rasakan</h1>
              <div className=' d-flex gap-4 justify-content-center flex-wrap mt-5'>
              {music?.map((list) =>
              <div onClick={() => setShowMusic(list)} key={list.id}>
                  <Card style={{ maxWidth: '900rem',height:"15.5rem", padding:'13px', cursor:'pointer' }} className="bg-dark" onClick={handleShow} >
                  <Card.Img variant="top" src={list.thumbnail} style={{width: 165, height:152, objectFit:'cover'}} onClick={() => setSmShow(true)}/>
                    <div style={{lineHeight:1, paddingTop:15}}>
                        <div className='d-flex justify-content-between align-items-center'>
                          <Card.Title className="fw-semibold fs-6" style={{color:"#fff", whiteSpace:"nowrap",  overflow:"hidden", textOverflow:'ellipsis', width:"100px"}}>{list.title}</Card.Title>
                          <p className="text-secondary">{list.year}</p>
                        </div>
                        <span style={{color:"#fff", fontSize:13}}>{list.artist.name}</span>
                    </div>
                  </Card>
              </div>
              )}
              </div> 
            </Col>
          </Row>
        </Container>
        console.log(list);
        { state.isLogin !== false ? 
          state.user.subscribe === "premium" ? 
              showMusic === false ? 
              <></>
              :
              <Navbar className="fixed-bottom pb-5 mb-5">
                  <AudioPlay item={showMusic} /> 
              </Navbar>
              
              :
                <ModalSubs show={smShow} handle={() => setSmShow(false)} />
                // <ModalRegister />
              :
              <ModalLogin show={show} handle={handleClose}/>
          }
            

        </>
    )
}
export default Content