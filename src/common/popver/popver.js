import colors from "@constants/colors";
import { Popover, Tag } from "antd";

function CustomPopover ({data, profileElements, profile}) {
    return (
        <div className="flex items-center justify-center">
        <div
        style={{
          maxWidth: "300px",
          overflow: "auto",
          justifyContent: "center",
          alignItems: "center",
          color: `${colors.text_color}`,
          display: 'contents'
        }}
        >
          {data?.length > 0 ? profileElements : '-'}
        </div>
          {data?.length > 2 && 
          <Popover content={profile}>
            <Tag
              className="w-max"
              color={colors.background_event}
              style={{
                color: colors.textBase,
                padding: 4,
                background: colors.background_tag,
                borderColor: colors.background_tag,
              }}
            >
              <p>...</p>
            </Tag>
          </Popover>}
      </div>
    )
}
 
export default CustomPopover;