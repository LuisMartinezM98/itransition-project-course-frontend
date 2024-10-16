import PieChart from "../Graphic/PieChart"


const LastSurvey = () => {
  return (
    <div className="flex">
        <div>
            <p>Questions:</p>
            <select name="Quesions" id="question" className="bg-gray-200 p-2 rounded-md mt-4">
                <option>Question 1</option>
                <option>Question 2</option>
                <option>Question 3</option>
                <option>Question 4</option>
            </select>
        </div>
        <PieChart/>
    </div>
  )
}

export default LastSurvey