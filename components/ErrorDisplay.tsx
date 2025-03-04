interface ErrorDisplayProps {
  message: string;
}

export default function ErrorDisplay({ message }: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
        <p className="font-bold">Error</p>
        <p>{message}</p>
      </div>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
