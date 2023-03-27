import { useContext } from "react";
import { Image, Navbar } from "react-bootstrap";
import AudioPlayer,  { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { UserContext } from "../../context/UserContext";
import { useQuery } from "react-query";
import { API } from "../../config/api";

function AudioPlay({item}) {
    const [state] = useContext(UserContext)
    
    console.log(item);


    // console.log(item)
    return(
        <Navbar className="fluid fixed-bottom container text-white bg-dark px-3">
                <Image src={item?.thumbnail} roundedCircle="true" width={85} className="pe-3"/>
                 <AudioPlayer src={item?.attache} 
                    layout="horizontal" 
                    autoPlay={state.isLogin !== false ? true : false }
                    header={`${item.artist.name} - ${item.title}`}
                    customProgressBarSection={[RHAP_UI.CURRENT_TIME, RHAP_UI.PROGRESS_BAR, RHAP_UI.DURATION]} 
                    className="w-65 text-white bg-dark"
                    showDownloadProgress={false}
                    showSkipControls={true}
                    showJumpControls={false}    
                    customAdditionalControls={[]}
                />
         </Navbar>
    )
}
export default AudioPlay