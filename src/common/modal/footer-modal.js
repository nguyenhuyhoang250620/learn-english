import CustomButtonCommon from "@common/button/custom-button";
import colors from "@constants/colors";

const FooterModal = ({
    onCancel,
    onOK,
}) => {
    return ( 
        <div className="h-[60px] flex justify-end items-center p-3 border border-t-zinc-700">
            <div className="mr-2">
                <CustomButtonCommon onClick={()=>onOK()} width={100} text={"OK"} backgroundColor={colors.redGlobal}/> 
            </div>
            <CustomButtonCommon onClick={()=> onCancel()} width={80} text={"Hủy"}  />
        </div>
     );
}
 
export default FooterModal;