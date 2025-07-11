import React from "react";
import { Progress } from "@/components/ui/progress";

interface PersonalityAxisBarProps {
  aLabel: string;
  bLabel: string;
  aCount: number;
  bCount: number;
  mainLabel: string; // 比如“61% 内向型”
  colorClass?: string; // tailwind颜色
}

export const PersonalityAxisBar: React.FC<PersonalityAxisBarProps> = ({
  aLabel,
  bLabel,
  aCount,
  bCount,
  mainLabel,
  colorClass = "bg-orange-400",
}) => {
  const total = aCount + bCount;
  const percent = total === 0 ? 50 : Math.round((Math.max(aCount, bCount) / total) * 100);
  const isA = aCount >= bCount;
  // 百分比主label靠近大头一侧
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-gray-500 text-base mb-1">
        <span>{aLabel}</span>
        <span>{bLabel}</span>
      </div>
      <div className="relative w-full">
        <Progress value={100} className="h-4 w-full bg-gray-200" />
        <div
          className={`absolute top-0 left-0 h-4 rounded-full transition-all duration-300 ${colorClass}`}
          style={{ width: `${(Math.max(aCount, bCount) / total) * 100}%` }}
        />
        {/* 百分比主label */}
        <div
          className={`absolute -top-7 flex items-center font-bold text-lg ${isA ? "left-0" : "right-0"} text-orange-600`}
          style={{
            transform: isA ? `translateX(${((aCount / total) * 100).toFixed(1)}%)` : `translateX(-${((bCount / total) * 100).toFixed(1)}%)`,
          }}
        >
          {mainLabel}
        </div>
        {/* 圆点 */}
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: `${(aCount / total) * 100}%` }}
        >
          <div className="w-6 h-6 rounded-full border-4 border-white bg-gray-200 shadow-md flex items-center justify-center" />
        </div>
      </div>
    </div>
  );
};

export default PersonalityAxisBar; 