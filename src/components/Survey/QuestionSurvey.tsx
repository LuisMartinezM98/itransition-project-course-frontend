import { Question } from "../../types/types";

interface QuestionSurveyProps {
    question: Question;
    onChange: (questionId: string, answer: { answer: any, type_question: string, question_id: string }) => void;
}

export const QuestionSurvey = ({ question, onChange }: QuestionSurveyProps) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value } = e.target;
        onChange(question.id_question, { 
            answer: value, 
            type_question: question.type_question.id_type_question, 
            question_id: question.id_question 
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, optionId: string) => {
        onChange(question.id_question, {
            answer: question.options.reduce((acc: any, option: any) => {
                acc[option.id_option] = option.id_option === optionId ? e.target.checked : acc[option.id_option] || false;
                return acc;
            }, {}),
            type_question: question.type_question.id_type_question,
            question_id: question.id_question
        });
    };

    return (
        <div className="flex flex-col border-b-2 border-blue-says items-center justify-center gap-4 mt-2 px-2">
            <label htmlFor={question.id_question} className="text-lg font-semibold">{question.question_text}</label>
            {question.type_question.id_type_question === '51908e38-995e-4044-988e-c661e387e4e4' && (
                <input 
                    type="text" 
                    className="bg-gray-100 mb-2 w-full md:w-1/2 rounded-lg text-center p-2" 
                    maxLength={100}
                    onChange={handleInputChange}
                />
            )}
            {question.type_question.id_type_question === '675aa799-c8ce-49ff-b783-2f401ae839e1' && (
                <select
                    name={question.id_question}
                    id={question.id_question}
                    className="bg-blue-says p-2 rounded-lg text-white mb-2"
                    onChange={handleInputChange}
                >
                    <option value="">-- Select an Option --</option>
                    {question.options.map(item => (
                        <option value={item.id_option} key={item.id_option}>{item.option_text}</option>
                    ))}
                </select>
            )}
            {question.type_question.id_type_question === 'ee2e80d2-e1b1-42a3-bc77-812e444f5c68' && (
                <>
                    {question.options.map(item => (
                        <div key={item.id_option}>
                            <label htmlFor={item.id_option}>{item.option_text}</label>
                            <input
                                type="checkbox"
                                value={item.id_option}
                                onChange={(e) => handleCheckboxChange(e, item.id_option)}
                            />
                        </div>
                    ))}
                </>
            )}
            {question.type_question.id_type_question === '30654bc7-e4c9-43a1-a5a0-2f60ff2ff09d' && (
                <input
                    type="date"
                    id={question.id_question}
                    max="2025-12-31"
                    className="bg-blue-says p-2 text-white rounded-lg mb-2"
                    onChange={handleInputChange}
                />
            )}
            {question.type_question.id_type_question === '21388966-8b9b-47d5-9282-829c73bdffd4' && (
                <input
                    type="range"
                    id={question.id_question}
                    name={question.id_question}
                    min="0"
                    max="10"
                    onChange={handleInputChange} 
                />
            )}
        </div>
    );
};
