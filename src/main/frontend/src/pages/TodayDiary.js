import Diary from "../Diary/Diary";
import DateFormatConverter from "../utils/DateFormatConverter";

function TodayDiary(props) {
    return (
        <div>
            <Diary date={DateFormatConverter(new Date)}/>
        </div>
    )
}

export default TodayDiary;
