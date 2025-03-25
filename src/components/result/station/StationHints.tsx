
import React from 'react';

interface StationHintsProps {
  hints: string[];
}

const StationHints = ({ hints }: StationHintsProps) => {
  return (
    <div className="mb-4">
      <h4 className="font-semibold text-charcoal-light mb-1">Hints:</h4>
      <ul className="list-disc pl-5 space-y-1">
        {hints.map((hint, hintIndex) => (
          <li key={hintIndex}>{hint}</li>
        ))}
      </ul>
    </div>
  );
};

export default StationHints;
