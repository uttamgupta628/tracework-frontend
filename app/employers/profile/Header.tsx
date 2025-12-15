import {Bell, Search, User} from "lucide-react";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-500 rounded"></div>
                        <span className="font-bold text-lg">TRACEWORK</span>
                        <span className="text-xs text-gray-500">Jobs</span>
                    </div>
                    <h1 className="text-lg font-semibold">Employer&#39;s</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Bell size={20} className="text-gray-600"/>
                    </button>
                    <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">
                        <User size={20} className="text-orange-600"/>
                    </div>
                </div>
            </div>
        </header>
    );
}
