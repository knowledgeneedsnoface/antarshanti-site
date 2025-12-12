import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
            <h1 className="text-6xl font-serif text-gray-300 mb-4">404</h1>
            <h2 className="text-2xl font-light text-gray-800 mb-6 font-serif">A path yet to be discovered.</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Some journeys lead us into the unknown. This one seems to have led you off the map.
            </p>
            <Link
                href="/"
                className="px-8 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors shadow-lg"
            >
                Return to the Center
            </Link>
        </div>
    );
}
