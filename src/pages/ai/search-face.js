import CustomButtonCommon from "@common/button/custom-button";
import CustomInput from "@common/input/custom-input";
import CustomSelect from "@common/select/custom-select";
import DateTime from "@components/datetime/date-time";
import colors from "@constants/colors";
import PATH from "@constants/path";
import { handleOnChangeKey } from "@redux/slice/tabs-slice";
import dayjs from "dayjs";
import moment from "moment";
import { useDispatch } from "react-redux";

const CheckFace = () => {
    const dispatch = useDispatch()
    const today = moment().format('YYYY-MM-DD 23:59:59');
    const data = []
    const optionCamera = [
        {
          value: '1',
          label:'1'
        },
        {
          value: '2',
          label:'2'
        },
        {
          value: '3',
          label:'3'
        },
        {
          value: '4',
          label:'4'
        },
        {
          value: '5',
          label:'5'
        },
        {
          value: '6',
          label:'6'
        },
        {
          value: '7',
          label:'7'
        },
        {
          value: '8',
          label:'8'
        },
      ];
      const optionSelect = [
        {
          value: '1',
          label:'Tất cả'
        },
        {
          value: '2',
          label:'2'
        }
      ];
      const optionTime = [
        {
          value: '1',
          label:'Hôm nay'
        },
        {
          value: '2',
          label:'2'
        }
      ];
    return ( 
        <div className="p-10 overflow-auto scroll_default h-[96vh]">
            <CustomSelect widthText="180px" lineHeight="0px" title="Kênh" background={colors.background} width="300px" option={optionCamera} defaultValue={'1'}/>
            <CustomSelect widthText="180px" lineHeight="0px" title="Thời gian" background={colors.background} width="300px" option={optionTime} defaultValue={'1'}/>
            <DateTime 
                widthText="180px" lineHeight="20px" width="300px"
                defaultValue={[dayjs(today, 'YYYY/MM/DD'), dayjs(today, 'YYYY/MM/DD')]} 
                format={'YYYY/MM/DD'}
            />
            <CustomSelect widthText="180px" lineHeight="0px" title="Giới tính" background={colors.background} width="300px" option={optionSelect} defaultValue={'1'}/>
            <CustomSelect widthText="180px" lineHeight="0px" title="Tuổi" background={colors.background} width="300px" option={optionSelect} defaultValue={'1'}/>
            <CustomSelect widthText="180px" lineHeight="0px" title="Kính" background={colors.background} width="300px" option={optionSelect} defaultValue={'1'}/>
            <CustomSelect widthText="180px" lineHeight="0px" title="Râu" background={colors.background} width="300px" option={optionSelect} defaultValue={'1'}/>
            <CustomSelect widthText="180px" lineHeight="0px" title="Khẩu trang" background={colors.background} width="300px" option={optionSelect} defaultValue={'1'}/>
            <CustomSelect widthText="180px" lineHeight="0px" title="Biểu hiện" background={colors.background} width="300px" option={optionSelect} defaultValue={'1'}/>
            <div className="">
              <CustomInput widthText="180px" lineHeight="0px" width="300px" title={'Tên'} />
            </div>
            <div className="flex">
              <CustomInput widthText="180px" lineHeight="0px" width="300px" title={'Trùng hợp'} defaultValue={'80'} />
              <center className="ml-4 pt-2 font-black" style={{color:colors.textBase}}>%</center>
            </div>
            <div className="ml-[180px] py-3">
                <CustomButtonCommon backgroundColor={colors.redGlobal} width="100px" text={'Tìm kiếm'}
                onClick={()=>{
                 dispatch(handleOnChangeKey(`${PATH.AI}/${PATH.SEARCH_CHECK}`))
                 }} />
            </div>
        </div>
     );
}
 
export default CheckFace;