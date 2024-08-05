import CustomButtonCommon from "@common/button/custom-button";
import colors from "@constants/colors";

const CustomFooter = () => {
    return ( 
        <footer className="h-[8vh] w-full flex justify-between items-center px-5 border border-zinc-900" style={{background:colors.backgroundSide}}>
        <div>
          <CustomButtonCommon height="40px" width="max-content" text="Mặc định"/>
        </div>
        <div className="flex justify-between w-[180px]">
          <CustomButtonCommon height="40px" width="max-content" text="Làm mới"/>
          <CustomButtonCommon backgroundColor={colors.redGlobal} height="40px" width="max-content" text="Áp dụng"/>
        </div>
      </footer>
     );
}
 
export default CustomFooter;