
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { formatScrambledLetters } from '../utils/printUtils';

interface PrintableLettersProps {
  word: string;
}

const PrintableLetters: React.FC<PrintableLettersProps> = ({ word }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow pop-ups to print letters');
      return;
    }

    // Create print-friendly content
    printWindow.document.write(`
      <html>
        <head>
          <title>Printable Letters for "${word}"</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            .print-container {
              display: flex;
              flex-wrap: wrap;
              gap: 20px;
              justify-content: center;
            }
            .letter {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100px;
              height: 120px;
              font-size: 72px;
              font-weight: bold;
              border: 2px solid #000;
              margin: 10px;
              page-break-inside: avoid;
            }
            .instructions {
              margin-bottom: 30px;
              text-align: center;
            }
            @media print {
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="instructions">
            <h1>Scrambled Letters: ${word}</h1>
            <p>Cut out these letters and use them for your escape room word challenge.</p>
            <button class="no-print" onclick="window.print()">Print This Page</button>
          </div>
          <div class="print-container">
            ${formatScrambledLetters(word).map(letter => 
              `<div class="letter">${letter}</div>`
            ).join('')}
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-lg font-medium">Printable Letters</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handlePrint}
          className="flex items-center gap-2"
        >
          <Printer className="h-4 w-4" /> Print Letters
        </Button>
      </div>
      
      <div 
        ref={printRef} 
        className="flex flex-wrap gap-2 bg-gray-50 p-4 rounded-md border border-gray-200"
      >
        {formatScrambledLetters(word).map((letter, index) => (
          <div 
            key={index} 
            className="flex items-center justify-center w-10 h-12 bg-white font-bold text-xl border border-gray-300 rounded-md shadow-sm"
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrintableLetters;
