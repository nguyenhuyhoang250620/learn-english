import colors from "@constants/colors"
import TreeGroupDevice from "@components/map/device-group/tree-group"
import Search from "@common/search/custom-search"
import TableDevice from "@components/map/device-group/table-device"
const DeviceGroup = ()=>{
    return(
        <div className="p-2 w-full h-full space-x-5 flex">
            <div className="h-[92vh] w-[20%] space-y-2" style={{background:colors.bg_input}}>
                <Search/>
                <TreeGroupDevice/>
            </div>
            <div className="h-[92vh] w-[80%]" style={{background:colors.bg_input}}>
                <TableDevice/>
            </div>
        </div>
    )
}
export default DeviceGroup