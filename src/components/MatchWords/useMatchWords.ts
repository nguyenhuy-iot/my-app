import { useEffect, useState } from "react";
import { DATA } from "./data";
import { useGroupByChunk } from "./useGroupByChunk";
import { shuffle } from "./utils";

export type Pair = {
    question: string;
    answer: string;
};

export const useMatchQuestions = (initialPairs: Pair[] = DATA) => {

    const { currentGroup, isHasNext, nextGroup } = useGroupByChunk(initialPairs);

    const [pairs, setPairs] = useState<Pair[]>([]);
    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

    const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const [inputAnswer, setInputAnswer] = useState("");

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setPairs(currentGroup);
        setShuffledAnswers(shuffle(currentGroup.map((item) => item.answer)));

        setIsLoading(false)
    }, [currentGroup]);

    const checkMatch = (question: string, answer: string) => {
        const pair = pairs.find((p) => p.question === question && p.answer === answer);
        if (pair) {
            const newPairs = pairs.filter(
                (p) => !(p.question === question && p.answer === answer)
            );
            if (newPairs.length === 0 && isHasNext) {
                nextGroup()
            }
            else {
                setPairs(newPairs);
                setShuffledAnswers(shuffle(newPairs.map((item) => item.answer)));
            }
        }
        setSelectedQuestion(null);
        setSelectedAnswer(null);
    };

    const handleQuestionClick = (question: string) => {
        setSelectedQuestion(question);
        if (selectedAnswer) {
            checkMatch(question, selectedAnswer);
        }

    };

    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer);
        if (selectedQuestion) {
            checkMatch(selectedQuestion, answer);
        }
    };

    const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedQuestion) return;
        const currentInputAnswer = inputAnswer.trim()
        if (currentInputAnswer) {
            handleAnswerClick(currentInputAnswer);
            setInputAnswer("");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputAnswer(e.target.value);
    };


    return {
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
    };
};