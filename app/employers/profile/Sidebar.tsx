"use client";
import {
    CheckSquare, FileText, Grid, HelpCircle, LogOut,
    MessageSquare, Settings, TrendingUp, User
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
    const pathname = usePathname();

    // Base path for all employer routes
    const basePath = "/employers";

    // Helper: Check if the current path matches the menu item
    // matches "/employers/profile" against "/employers/profile"
    const isActive = (path: string) => pathname === path || pathname?.startsWith(`${path}/`);

    const menuItems = [
        { icon: Grid, label: 'My Dashboard', path: `${basePath}/dashboard` },
        { icon: User, label: 'My Profile', path: `${basePath}/profile` },
        { icon: FileText, label: 'Job Postings', path: `${basePath}/job-postings` },
        { icon: CheckSquare, label: 'Application Status', path: `${basePath}/applications` },
        { icon: MessageSquare, label: 'Feedback', path: `${basePath}/feedback` },
        { icon: TrendingUp, label: 'Tracecoins', path: `${basePath}/tracecoins` },
        { icon: HelpCircle, label: 'Support', path: `${basePath}/support` },
        { icon: Settings, label: 'Settings', path: `${basePath}/settings` },
    ];

    return (
        <div className="w-full h-full bg-white p-4">
            <div className="space-y-1">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`
                            w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                            ${isActive(item.path)
                            ? 'bg-orange-50 text-orange-600'
                            : 'text-gray-600 hover:bg-gray-50'}
                        `}
                    >
                        <item.icon size={20} />
                        <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                ))}
            </div>

            <button
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors mt-8"
                onClick={() => console.log("Logout logic here")}
            >
                <LogOut size={20} />
                <span className="text-sm font-medium">Logout</span>
            </button>
        </div>
    );
}