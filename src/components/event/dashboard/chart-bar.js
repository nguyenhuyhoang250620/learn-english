import { BidirectionalBar } from "@ant-design/plots";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");
const ChartBar = () => {
  const data = [
    {
      country: '乌拉圭',
      '2016年耕地总面积': 13.4,
      '2016年转基因种植面积': 12.3,
    },
    {
      country: '巴拉圭',
      '2016年耕地总面积': 14.4,
      '2016年转基因种植面积': 6.3,
    },
    {
      country: '南非',
      '2016年耕地总面积': 18.4,
      '2016年转基因种植面积': 8.3,
    },
    {
      country: '巴基斯坦',
      '2016年耕地总面积': 34.4,
      '2016年转基因种植面积': 13.8,
    },
    {
      country: '阿根廷',
      '2016年耕地总面积': 44.4,
      '2016年转基因种植面积': 19.5,
    },
    {
      country: '巴西',
      '2016年耕地总面积': 24.4,
      '2016年转基因种植面积': 18.8,
    },
    {
      country: '加拿大',
      '2016年耕地总面积': 54.4,
      '2016年转基因种植面积': 24.7,
    },
    {
      country: '中国',
      '2016年耕地总面积': 104.4,
      '2016年转基因种植面积': 5.3,
    },
    {
      country: '美国',
      '2016年耕地总面积': 165.2,
      '2016年转基因种植面积': 72.9,
    },
  ];
  const config = {
    data,
    xField: 'country',
    yField: ['2016年耕地总面积', '2016年转基因种植面积'],
    color: [
      '#5D4587',
      '#23AFAF'
      // 'r(1, 1, 1) 0:#30C0FA 1:#0C2970',
      // 'r(1, 1, 1) 0:#FB8538 1:#FA2432', 
      // 'r(1, 1, 1) 0:#EEA34C 1:#E2FE4E',
      // 'r(1, 1, 1) 0:#6C981D 1:#1B781B'
    ],
    style: {
      fill: (d) => {
        if (d.groupKey === '2016年转基因种植面积') return '#64DAAB';
        return '#6395FA';
      },
    },
  };
  return <BidirectionalBar {...config} />;
};

export default ChartBar;
