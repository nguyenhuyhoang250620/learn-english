import CustomFooter from "@common/footer/custom-footer";
import CustomSelect from "@common/select/custom-select";

const optionFeat = [
  {
    value: '1',
    label:'bảng điều khiển'
  },
  {
    value: '2',
    label:'Bàn phím'
  },
  {
    value: '3',
    label:'Bộ chỉnh lưu'
  },
  {
    value: '4',
    label:'Giao thức COM'
  },
  {
    value: '5',
    label:'Ma trận PTZ'
  },
]
const optionData = [
  {
    value: '1',
    label:'1200'
  },
  {
    value: '2',
    label:'2400'
  },
  {
    value: '3',
    label:'4800'
  },
  {
    value: '4',
    label:'9600'
  },
  {
    value: '5',
    label:'19200'
  },
  {
    value: '6',
    label:'38400'
  },
  {
    value: '6',
    label:'57600'
  },
  {
    value: '7',
    label:'115200'
  },
]
const optionStop = [
    {
        value: '1',
        label:'1'
    },
    {
        value: '2',
        label:'1.5'
    },
    {
        value: '3',
        label:'2'
    },
]
const options = [
    {
        value: '1',
        label:'5'
    },
    {
        value: '2',
        label:'6'
    },
    {
        value: '3',
        label:'7'
    },
    {
        value: '4',
        label:'8'
    },
]
const optionCheck = [
    {
        value: '1',
        label:'Không có'
    },
    {
        value: '2',
        label:'Lẻ'
    },
    {
        value: '3',
        label:'Chẵn'
    },
    {
        value: '4',
        label:'Đánh dấu'
    },
    {
        value: '5',
        label:'Vô hiệu'
    },
]
const SystemGate = () => {
    return ( 
        <div className="h-[90vh]">
            <div className="w-full h-[87vh] p-6 overflow-auto scroll_default">
                <CustomSelect title='Chức năng' option={optionFeat} defaultValue='1'/>
                <CustomSelect title='Tốc độ truyền dữ liệu' option={optionData} defaultValue='7'/>
                <CustomSelect title='Bit dữ liệu' option={options} defaultValue='4'/>
                <CustomSelect title='Dừng bit' option={optionStop} defaultValue='1'/>
                <CustomSelect title='Xác thực' option={optionCheck} defaultValue='1'/>
            </div>
            <CustomFooter />
        </div>
     );
}
 
export default SystemGate;