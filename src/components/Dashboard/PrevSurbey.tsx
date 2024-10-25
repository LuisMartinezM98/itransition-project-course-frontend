
import type { Form } from "../../types/types"

interface PrevSurbeyProps {
  survey: Form
}

const PrevSurbey = ({survey}: PrevSurbeyProps) => {


  return (
    <div className="border-4 border-blue-says p-2 w-[200px] h-[200px] flex flex-col justify-center items-center gap-2 cursor-pointer hover:-translate-x-1 hover:-translate-y-1 ease-in-out delay-100 duration-300 transition-all hover:shadow-xl">
        <p className="text-2xl font-bold text-blue-says">{survey.title}</p>
        <p>{survey.questions.length} Questions</p>
        <p>By {survey.name}</p>
    </div>
  )
}

export default PrevSurbey