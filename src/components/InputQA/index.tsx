'use client';
import { useQAInput } from './useQAInput';



export default function InputQA() {
    const {
        qaList,
        qaText,
        errorMessage,
        handleChangeTextArea,
        handleAddList,
        handleRemove,
        handleStartExam,
    } = useQAInput();

    return (
        <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Q&amp;A List</h1>
            <label className="block mb-2 font-semibold" htmlFor="qa-input">
                Nhập chuỗi JSON dạng:
            </label>
            <textarea
                id="qa-input"
                className="w-full h-32 p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                // placeholder={sampleDataJson}
                value={qaText}
                onChange={handleChangeTextArea}
            />
            {errorMessage && <div className="text-red-500 mb-2">{errorMessage}</div>}
            <div className="flex space-x-2 mb-4">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={handleAddList}
                >
                    Lưu danh sách
                </button>
                {qaList.length > 0 && (
                    <button
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        onClick={handleStartExam}
                    >
                        Bắt đầu làm bài
                    </button>
                )}
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-2">Danh sách đã lưu</h2>
            <ul className="space-y-2">
                {qaList.map((item, idx) => (
                    <li key={idx} className="p-3 bg-gray-50 rounded flex justify-between items-center">
                        <div>
                            <b>Q:</b> {item.question} <br />
                            <b>A:</b> {item.answer}
                        </div>
                        <button
                            className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => handleRemove(idx)}
                        >
                            Xoá
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}