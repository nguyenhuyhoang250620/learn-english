import LeftBar from "@components/live/custom-left-bar";
import TreeCamera from "@components/live/custom-tree-camera";
import VideoView from "@components/live/main-content";
import TYPE_ACTION from "@constants/action";
import colors from "@constants/colors";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const LiveScreen = ()=>{

    const dispatch = useDispatch();
    const loadDataProvince = ()=>{
        dispatch({
            type:TYPE_ACTION.LIVE.GET_LIST_PROVINCE,
            payload:{}
        })
    }
    useEffect(()=>{
        loadDataProvince();
    },[])
    return(
        <div className="h-full flex w-[100vw] space-x-1">
            <div className="" style={{background:colors.backgroundSide}}>
                <TreeCamera/>
            </div>
            <div className="overflow-hidden" style={{background:colors.backgroundSide}}>
                <VideoView/>
            </div>
            <div className="" style={{background:colors.backgroundSide}}>
                <LeftBar />
            </div>
        </div>
    )
}
export default LiveScreen