import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import placeHolderImg from "../assets/img/elementor-placeholder-image.webp"

export default function RoomDetail() {
    const {state} = useLocation();
    //const {room} = state;
    
    return(
        <>
            <div className="container-fluid">
                <h2>Title</h2>
                <div className="row">
                    <div className="col-md-6">
                        <img src={placeHolderImg} alt="" style={{
                            width:'100%'
                        }}/>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <img src={placeHolderImg} alt="" className="col-md-6"/>
                            <img src={placeHolderImg} alt="" className="col-md-6"/>
                        </div>
                        <div className="row mt-3">
                            <img src={placeHolderImg} alt="" className="col-md-6"/>
                            <img src={placeHolderImg} alt="" className="col-md-6"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-9">
                        {/* Body de la Room*/}
                    </div>
                    <div className="col-md-3">
                        {/* Modal o seccion para reservar */}
                    </div>
                </div>

            </div>
        </>
    )
}