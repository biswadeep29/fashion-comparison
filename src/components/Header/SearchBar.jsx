import React, {useState} from "react";
import {Search} from "lucide-react";

function SearchBar() {
    const [query, setQuery] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5173/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({query}),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response from server:", data.message);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative">
            <input
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button type="submit" className="absolute right-3 top-2.5">
                <Search className="w-5 h-5 text-white/70" />
            </button>
        </form>
    );
}

export default SearchBar;
