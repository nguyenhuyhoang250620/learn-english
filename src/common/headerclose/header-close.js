import CustomButtonCommon from "@common/button/custom-button";
import colors from "@constants/colors";
import { useDispatch } from "react-redux";
import { handleOnChangeKey } from "@redux/slice/tabs-slice";
import PATH from "@constants/path";
import { useLocation } from "react-router";


const HeaderClose = ({title}) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const part = location.pathname.split('/')[3]
    return ( 
        <div className="h-[60px] flex justify-between items-center p-3" style={{background:colors.background_form}}>
            <span className="" style={{color:colors.textBase}}>{title}</span>
            <div className="mr-2">
                <CustomButtonCommon onClick={()=>{
                    switch (part) {
                        case 'ai-search':
                            dispatch(handleOnChangeKey(`${PATH.AI}/${PATH.SEARCH_AI}`))
                            break;
                        case 'face-check':
                            dispatch(handleOnChangeKey(`${PATH.AI}/${PATH.FACE_CHECK}`))
                            break;
                        case 'human-detection':
                            dispatch(handleOnChangeKey(`${PATH.AI}/${PATH.HUMAN_DETECTION}`))
                            break;
                        case 'vehicle-detection':
                            dispatch(handleOnChangeKey(`${PATH.AI}/${PATH.VEHICLE_DETECTION}`))
                            break;          
                        default:
                            break;
                    }
                }} text={'Trở về'} width={100} backgroundColor={colors.redGlobal}/> 
            </div>
        </div>
     );
}
 
export default HeaderClose;