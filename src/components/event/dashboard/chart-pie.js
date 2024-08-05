import {Pie} from '@ant-design/plots';
import 'moment/locale/vi';

const CharPie = () => {
  const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    color:['#00C49F','#0088FE','#8F66DE','#E36E7E','#FF8042','#FFBB28'],
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: '',
      },
    },
  };
  return <Pie {...config} />;
	
};

export default CharPie;

// const [dataMap, setDataMap] = useState([]);
// 	const listColor = ['red', 'white', 'green', 'blue', 'yellow', 'black'];
// 	const listColorMap = ['#E21A3D', '#FFFFFF', '#009544', '#4BAEF6', '#FDE938', '#000000'];
// 	const summarizeData = data => data.reduce((acc, currentItem) => {
// 		const existingItem = acc.find(item => item.type === currentItem.type);

// 		if (existingItem) {
// 			existingItem.value += currentItem.value;
// 		} else {
// 			acc.push({type: currentItem.type, value: currentItem.value});
// 		}

// 		return acc;
// 	}, []);

// 	const fetchData = () => {
// 		const arr = [];

// 		listColor.forEach(item => {
// 			data.forEach(e => {
// 				if (e?.data_type === item) {
// 					arr.push({
// 						type: item,
// 						value: e.total,
// 					});
// 				}
// 			});
// 		});
// 		const arr_list = summarizeData(arr);
// 		setDataMap(arr_list);
// 	};

// 	useEffect(() => {
// 		fetchData();
// 	}, [data]);

// 	const config = {
// 		appendPadding: 10,
// 		angleField: 'value',
// 		colorField: 'type',
// 		color: listColorMap,
// 		radius: 0.9,
// 		label: {
// 			type: 'inner',
// 			offset: '-30%',
// 			content: ({percent}) => `${(percent * 100).toFixed(0)}%`,
// 			style: {
// 				fontSize: 14,
// 				textAlign: 'center',
// 				fill: '#000000',
// 			},
// 		},
// 		animation: {
// 			appear: {
// 				animation: 'path-in',
// 				duration: 1000,
// 			},
// 		},
// 		state: {
// 			active: {
// 				animate: {duration: 100, easing: 'easeLinear'},
// 				style: {
// 					lineWidth: 10,
// 					stroke: `${ColorsContant.bg_chart}`,
// 				},
// 			},
// 		},
// 		interactions: [
// 			{
// 				type: 'pie-legend-active',
// 			},
// 			{
// 				type: 'element-active',
// 			},
// 		],
// 		legend: {
// 			itemName: {
// 				formatter: text => t(text),
// 			},
// 		},
// 	};

// 	return <>
// 		<h2 className='text-white text-base pb-2'>{t('vehicle_color')}</h2>
// 		{dataMap && <Pie {...config} data={dataMap} />}</>;

