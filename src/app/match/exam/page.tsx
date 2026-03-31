'use client';
import MatchWords from "@/components/MatchWords";
import { useAppSelector } from "@/store/hooks";

export default function ExamPage() {
  const qaList = useAppSelector((state) => state.qa.qaList);
  console.log("🚀 ~ ExamPage ~ qaList:", qaList)

  return <div>
    <MatchWords qaList={qaList}/>    
  </div>
}