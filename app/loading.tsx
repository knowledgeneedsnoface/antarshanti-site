export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50/50 backdrop-blur-sm">
            <div className="relative w-16 h-16 mb-8">
                <div className="absolute inset-0 rounded-full border-2 border-amber-200 animate-ping"></div>
                <div className="absolute inset-0 rounded-full border-2 border-amber-400 opacity-50 animate-pulse"></div>
            </div>
            <h2 className="text-xl font-serif italic text-amber-800 animate-pulse">Inhaling...</h2>
            <p className="text-sm text-gray-500 mt-2 font-light">The journey adjusts to your pace.</p>
        </div>
    );
}
