import React, { useState } from 'react';
import type { HeatmapPoint } from '../types';

interface AnalysisImageViewerProps {
  imageUrl: string;
  heatmapPoints: HeatmapPoint[];
}

const HeatmapPointComponent: React.FC<{ point: HeatmapPoint }> = ({ point }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isPositive = point.type === 'positive';

  const pointColor = isPositive ? 'rgba(22, 163, 74, 0.8)' : 'rgba(220, 38, 38, 0.8)'; // green-600 vs red-600
  const labelBgColor = isPositive ? 'bg-emerald-600' : 'bg-red-600';

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
      style={{ left: `${point.x}%`, top: `${point.y}%` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-5 h-5 rounded-full cursor-pointer transition-transform duration-200"
        style={{
          background: `radial-gradient(circle, ${pointColor} 0%, rgba(0,0,0,0) 70%)`,
          transform: isHovered ? 'scale(2.5)' : 'scale(1)',
        }}
        aria-hidden="true"
      />
      {isHovered && (
        <div
          className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs text-white font-semibold rounded-md shadow-lg whitespace-nowrap ${labelBgColor}`}
        >
          {point.label}
          <div
            className={`absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 ${isPositive ? 'border-t-emerald-600' : 'border-t-red-600'}`}
          />
        </div>
      )}
    </div>
  );
};

export default function AnalysisImageViewer({ imageUrl, heatmapPoints }: AnalysisImageViewerProps): React.JSX.Element {
  if (!imageUrl) return null;

  return (
    <div className="relative w-full aspect-w-4 aspect-h-3 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden">
      <img src={imageUrl} alt="Analyzed movement" className="w-full h-full object-contain" />
      {(heatmapPoints || []).map((point, index) => (
        <HeatmapPointComponent key={index} point={point} />
      ))}
    </div>
  );
}
