import styles from "@style/search.module.scss"
import TreeGroup from "@components/search/tree-group"
import TimeFilter from "@components/search/time-filter"
import GridPlayBack from "@components/search/gird-play-back"
import colors from "@constants/colors"
import { FaFile } from "react-icons/fa";
import TreePlayBack from "@common/tree/tree-playback"
const PlayBack = () =>{
    const listFake = Array(100).fill({
        name:"Bản ghi"
    })
    return(
        <div className={`h-full flex w-[100vw] space-x-1`}>
            <div className={`w-[248px]`} style={{borderRight:`1px solid ${colors.borderColor}`}}>
                <TreeGroup/>
                <TimeFilter/>
            </div>
            <div className='overflow-hidden'>
                <GridPlayBack/>
            </div>
            <div className='min-w-[248px] overflow-auto scroll_default' style={{background:colors.backgroundSide}}>
                <p className="text-[18px] font-bold p-2" style={{color:colors.textBase}}>Danh sách bản ghi</p>
                <TreePlayBack />
            </div>
        </div>
    )
}
export default PlayBack