import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useSpring } from "react-spring";
import colors from "@constants/colors";
import { TbSum } from "react-icons/tb";
const CustomCard = ({ title,colorFrom, colorTo,urlIcon,value }) => {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const { number } = useSpring({
    number: count,
    from: { number: 0 },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div
      style={{
        height: "max-content",
        borderRadius: "4px",
        minHeight: "100px",
        // boxShadow: "-3px -3px 5px rgba(255, 255, 255, 0.2)",
        background:colors.backgroundSide
      }}
      className="flex flex-col p-2 justify-start cut-container"
    >
      <div className="flex items-start flex-col">
        <div className="flex items-start justify-between w-full">
          <p
            style={{ color: colors.textBase }}
            className="text-base font-normal"
          >
            {title}
          </p>
          <div className="w-[30px] h-[30px] rounded-md flex items-center justify-center" style={{background: `linear-gradient(to bottom right, ${colorFrom}, ${colorTo})`}}>
            <TbSum/>
          </div>
        </div>
        <p
          style={{ color: "#FFFFFFB2" }}
          className="text-3xl font-bold"
        >
          {value}
        </p>
      </div>
    </div>
  );
};

export default CustomCard;
