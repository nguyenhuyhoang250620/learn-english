import { Typography } from "antd";
const { Text } = Typography;
const CustomText = ({text,color})=>{
    return(
        <Text style={{color:color}}>{text}</Text>
    )
}
export default CustomText