'use client';
import { Pair, useMatchQuestions } from "./useMatchWords";

type MatchQuestionsProps = {
  qaList?: Pair[];
}

export default function MatchQuestions({ qaList }: MatchQuestionsProps) {
  const {
    pairs,
    shuffledAnswers,
    selectedQuestion,
    selectedAnswer,
    inputAnswer,
    isLoading,
    handleQuestionClick,
    handleAnswerClick,
    handleInputChange,
    handleInputSubmit,
  } = useMatchQuestions(qaList);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold text-blue-500">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Ghép từ với nghĩa</h1>
      <div className="grid grid-cols-2 gap-6">

        <div>
          <h2 className="font-semibold mb-2 text-center">Từ</h2>
          <div className="flex flex-col gap-2">
            {pairs.map((pair) => (
              <button
                key={pair.question}
                className={`px-3 py-2 rounded border ${selectedQuestion === pair.question
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-blue-100"
                  }`}
                onClick={() => handleQuestionClick(pair.question)}
              >
                {pair.question}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2 text-center">Nghĩa</h2>
          <div className="flex flex-col gap-2">
            {shuffledAnswers.map((answer) => (
              <button
                key={answer}
                className={`px-3 py-2 rounded border ${selectedAnswer === answer
                  ? "bg-green-500 text-white"
                  : "bg-white hover:bg-green-100"
                  }`}
                onClick={() => handleAnswerClick(answer)}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      </div>
      <form onSubmit={handleInputSubmit} className="mt-4 flex">
        <input
          type="text"
          className="flex-1 px-3 py-2 border rounded-l"
          placeholder="Gõ đáp án..."
          value={inputAnswer}
          onChange={handleInputChange}
          disabled={!selectedQuestion}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r disabled:opacity-50"
          disabled={!selectedQuestion || !inputAnswer.trim()}
        >
          OK
        </button>
      </form>
      {pairs.length === 0 && (
        <div className="mt-8 text-center text-xl text-green-600 font-bold">
          Chúc mừng bạn đã hoàn thành!
        </div>
      )}
    </div>
  );
}