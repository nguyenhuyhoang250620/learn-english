import {Button} from "antd";
const CustomButtonSave = ({title,onClick}) =>{
    return(
        <Button style={{backgroundColor:"#B5122E",margin:"5px"}} onClick={() => onClick()} type="primary">
            {title}
        </Button>
    )
}
export default CustomButtonSave