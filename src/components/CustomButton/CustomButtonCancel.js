import {Button} from "antd";
const CustomButtonCancel = ({title,onClick}) =>{
    return(
        <Button style={{border:"1px solid #B5122E",background:"white",color:"#B5122E",margin:"5px"}} onClick={() => onClick()} type="primary">
            {title}
        </Button>
    )
}
export default CustomButtonCancel