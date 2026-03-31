import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addQA, removeQA } from '../../store/qaSlice';
import { QAItem } from '../../store/type';
import { useRouter } from 'next/navigation';

const MATCH_EXAM_PATH = '/match/exam';

const sampleData = [
    { question: "Q1", answer: "A1" },
    { question: "Q2", answer: "A2" }
];

const sampleDataJson = JSON.stringify(sampleData, null, 2);


export function useQAInput() {
    const router = useRouter();
    const qaList = useAppSelector((state) => state.qa.qaList);
    const dispatch = useAppDispatch();
    const [qaText, setQaText] = useState(sampleDataJson);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddList = () => {
        setErrorMessage('');
        try {
            const data = JSON.parse(qaText);
            if (!Array.isArray(data)) {
                setErrorMessage('Dữ liệu phải là một mảng các object.');
                return;
            }
            for (const item of data) {
                if (
                    typeof item.question !== 'string' ||
                    typeof item.answer !== 'string'
                ) {
                    setErrorMessage('Mỗi object phải có trường question và answer kiểu string.');
                    return;
                }
                dispatch(addQA(item as QAItem));
            }
            setQaText('');
        } catch (e) {
            setErrorMessage('Chuỗi không hợp lệ. Hãy nhập đúng định dạng JSON.');
        }
    };
    const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQaText(e.target.value);
    };

    const handleRemove = (idx: number) => {
        dispatch(removeQA(idx));
    };

    const handleStartExam = () => {
        router.push(MATCH_EXAM_PATH);
    };

    return {
        qaList,
        qaText,
        errorMessage,
        handleChangeTextArea,
        handleAddList,
        handleRemove,
        handleStartExam
    };
}