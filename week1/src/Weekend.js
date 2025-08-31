function Weekends(){
    // with Dictionary Date
const weekendsDic = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
};
const today = new Date();
const currentDayDic=weekendsDic[today.getDay()]
console.log(currentDayDic)

    return(
        <>
        <h2>
  {currentDayDic==="Sunday" || currentDayDic==="Saturday"? "Today is Weekend" : "Today is working day" }
</h2>
<h3>    Today :{today.toLocaleDateString()}    day:{currentDayDic}</h3>
</>
    );
}
export default Weekends;