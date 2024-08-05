
import { ConfigProvider, DatePicker } from 'antd';
import colors, { sizes } from '@constants/colors';
import { images } from '@common/images/image';
const DateTime = ({
    onChange,
    defaultValue,
    title, 
    format, 
    placeholder, 
    font='font-semibold',
    width='100%',
    height='40px',
    widthText='150px',
    lineHeight='25px',
    background,
	isRange = true,
}) => {
	const {RangePicker} = DatePicker
	return (
		<div className={`flex flex-col sm:flex-row item-center`} style={{marginBottom:lineHeight}}>
        <div className={`flex mb-[10px]`} style={{width:widthText}}>
            <span className={`flex items-center ${font}`} style={{color: colors.textBase}}>
                {title}
            </span>
        </div>
        <div>
			<ConfigProvider
				theme={{
                    token: {
                        colorBgContainer: background,
                        colorBgElevated: colors.background_form,
                        controlHeight: sizes.heightInput,
                        controlItemBgActive: background,
                        colorPrimary: colors.redGlobal,
                        colorFillSecondary: colors.background,
                        colorTextBase: colors.text,
                        colorTextQuaternary: colors.textBase,
                      },
					components: {
						DatePicker: {
							colorTextPlaceholder: colors.textPlaceholder,
							colorBorder: colors.textBase,
							borderRadius: 0,
							colorPrimaryHover: 'none',
							colorBgContainerDisabled: colors.background_form,
							colorText: colors.textBase,
							colorTextDisabled: colors.textBase,
							controlOutlineWidth:0
						},
					},
				}}
				>
				{isRange?
				<RangePicker
					style={{ width: width, height: height, color: colors.textBase }}
					format={format}
					placeholder={placeholder}
					defaultValue={defaultValue}
					allowClear
					showTime={{format: 'HH:mm'}}
					onChange={onChange}/>
					:
				<DatePicker
					className="w-full"
					style={{ width: width, height: height, color: colors.textBase }}
					format={format}
					placeholder={placeholder}
					suffixIcon={
					  <img alt="#" src={images.calendar} width={16} />
					}
					popupStyle={{
					  backgroundColor: colors.background_side,
					}}
					onChange={onChange}
					defaultValue={defaultValue}
					allowClear
				  />
				}
			</ConfigProvider>
        </div>
		</div>
	);
};

export default DateTime;
