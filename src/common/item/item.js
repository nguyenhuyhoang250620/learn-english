import colors from "@constants/colors";
import { Tooltip } from "antd";

const Item = ({ title, content, minWidth = "100px", fontWeight = 500 }) => {
  return (
    <div className="flex">
      <p
        className="truncate text-start"
        style={{
          color: colors.textBase,
          minWidth: minWidth,
          fontWeight: fontWeight,
        }}
      >
        {title}:
      </p>
      <Tooltip title={content}>
        <p className="truncate" style={{ color: colors.textBase }}>
          {content}
        </p>
      </Tooltip>
    </div>
  );
};
export default Item;
