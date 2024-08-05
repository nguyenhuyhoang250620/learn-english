import { Modal, ConfigProvider, Checkbox } from "antd"
import CustomSelect from "@common/select/custom-select"
import CustomButtonCommon from "@common/button/custom-button"
import colors from "@constants/colors";
import CustomCheckBox from "@common/checkbox/custom-check-box";
import CustomInput from "@common/input/custom-input";

const CustomModal = ({ open, onCancel,onScan }) => {
    const calendaList = [];

    for (var i = 1; i <= 31; i++) {
        if (i < 10) {
            calendaList.push("0" + i.toString());
        } else {
            calendaList.push(i.toString());
        }
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    background: colors.background_sider,
                    colorText: colors.text,
                    paddingContentHorizontalLG: 0,
                    paddingMD: 0,
                    lineHeightHeading5: 3,
                    borderRadiusLG: 0
                },
                components: {
                    Modal: {
                        headerBg: colors.redGlobal,
                        titleColor: colors.text
                    }
                }
            }}
        >
            <Modal
                title={
                <div className="w-full flex justify-center items-center text-[18px]" style={{color: colors.textBase}}>
                Manual Scanning
                </div>
                }
                centered
                open={open}
                onOk={() => { }}
                onCancel={onCancel}
                footer={[
                    <div className="flex justify-center items-center mt-[15px] pb-[20px]">
                        <CustomButtonCommon
                            height="40px"
                            width="70px"
                            text="Scan"
                            backgroundColor={colors.redGlobal}
                            onClick={onScan}
                        />
                    </div>
                ]}
                closable={false}
                width={800}
            >
                <div className="flex h-[500px]"
                    style={{backgroundColor:colors.background_sider}}
                >
                    <div className="w-1/2 p-[10px]">
                        <span style={{color: colors.textBase}}>IP Range</span>
                        <div className="py-2">
                            <CustomInput
                                title="Start IP"
                                placeholder="-"
                                isVertical={true}
                                width="260px"
                            />
                        </div>
                        <div className="py-2">
                            <CustomInput
                                title="End IP"
                                placeholder="-"
                                isVertical={true}
                                width="260px"
                            />
                        </div>
                        <div className="h-[80px]"></div>
                        <CustomCheckBox isChecked title={'Re-scanning Schedules'}/>
                        <div className="py-2">
                            <CustomSelect
                                title="Frequency"
                                placeholder="Slect the desired value"
                                isVertical={true}
                            />
                        </div>
                    </div>
                    <div
                    className="w-1/2 p-[10px] h-[80%] flex flex-col justify-around">
                        <span style={{color: colors.textBase}}>Please Customize Frequency by select values or choose days on calendar</span>
                        <span style={{color: colors.textBase}}>Customize Frequency</span>
                        <div className="py-2">
                            <CustomSelect
                                placeholder="Select your desired value!"
                                title="Unit"
                                isVertical={true}
                            />                            
                        </div>
                        <div className="py-2">
                            <CustomSelect
                                placeholder="Enter your desired value!"
                                title="Number of Times"
                                isVertical={true}
                            />
                        </div>
                        <span style={{color: colors.textBase}}>Select re-scanning days on calendar</span>
                        <div className="flex flex-wrap">
                        {
                            calendaList.map((item,index) => {
                                return (
                                    <div
                                        className="flex justify-center items-center h-[30px] w-[30px] m-[1px] rounded-[6px]"
                                        key={index}
                                        style={{background:colors.background_form, color:colors.textBase}}
                                    >
                                        {item}
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                </div>
            </Modal>
        </ConfigProvider>
    )
}
export default CustomModal