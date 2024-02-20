import disconnectNetwork from "../../../assets/images/error_image.jpg"
const Error =() =>{
    return(
        <div style={{position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: "100%",
        width: "100%",
        background: "white",
        zIndex: 9999,
        justifyContent:"center",
        display:"flex",
        padding: 0}}>
            <img style={{height: "auto",
                width: "auto",mageRendering: "auto",}} src={disconnectNetwork}></img>
        </div>
    )
}

export default Error