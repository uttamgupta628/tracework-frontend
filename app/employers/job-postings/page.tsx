'use client';

import {useState} from 'react';
import {
    User,
    Bell,
    Search,
    Grid,
    FileText,
    CheckSquare,
    MessageSquare,
    TrendingUp,
    HelpCircle,
    Settings,
    LogOut,
    Edit,
    ExternalLink,
    Plus,
} from 'lucide-react';
import type {LucideIcon} from 'lucide-react';

/* =========================================================
   TYPES
========================================================= */

type SidebarItem = {
    icon: LucideIcon;
    label: string;
    path: string;
    id: string;
};

type Job = {
    id: number;
    title: string;
    salary: string;
    workMode: string;
    jobType: string;
    shiftTime: string;
    openings: string;
    location: string;
    education: string;
    experience: string;
    skills: string;
    certification: string;
    benefits: string;
};

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({activePage = 'job-postings'}: { activePage?: string }) {
    const menuItems: SidebarItem[] = [
        {icon: Grid, label: 'My Dashboard', path: '/dashboard', id: 'dashboard'},
        {icon: User, label: 'My Profile', path: '/profile', id: 'profile'},
        {icon: FileText, label: 'Job Postings', path: '/job-postings', id: 'job-postings'},
        {icon: CheckSquare, label: 'Application Status', path: '/applications', id: 'applications'},
        {icon: MessageSquare, label: 'Feedback', path: '/feedback', id: 'feedback'},
        {icon: TrendingUp, label: 'Tracecoins', path: '/tracecoins', id: 'tracecoins'},
        {icon: HelpCircle, label: 'Support', path: '/support', id: 'support'},
        {icon: Settings, label: 'Settings', path: '/settings', id: 'settings'},
    ];

    return (
        <div className="w-48 bg-white border-r border-gray-200 h-screen pt-16 fixed left-0 top-0 overflow-y-auto">
            <div className="p-3">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-md mb-1 transition-colors text-sm ${
                            activePage === item.id
                                ? 'bg-orange-50 text-orange-600'
                                : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <item.icon size={18}/>
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}

                <button
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md mt-4 text-gray-600 hover:bg-gray-50 text-sm">
                    <LogOut size={18}/>
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
}

/* =========================================================
   HEADER
========================================================= */

function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 h-16">
            <div className="flex items-center justify-between px-4 h-full">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-orange-500 rounded"/>
                        <span className="font-bold text-base">TRACEWORK</span>
                        <span className="text-xs text-gray-500">Jobs</span>
                    </div>
                    <h1 className="text-base font-semibold">Employer&apos;s</h1>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-64 pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                    </div>

                    <button className="p-2 hover:bg-gray-100 rounded-md">
                        <Bell size={18} className="text-gray-600"/>
                    </button>

                    <div className="w-9 h-9 bg-orange-200 rounded-full flex items-center justify-center">
                        <User size={18} className="text-orange-600"/>
                    </div>
                </div>
            </div>
        </header>
    );
}

/* =========================================================
   JOB CARD
========================================================= */

function JobCard({
                     job,
                     onEdit,
                     onView,
                 }: {
    job: Job;
    onEdit: () => void;
    onView: () => void;
}) {
    return (
        <div className="bg-white border border-gray-200 rounded-md p-5 mb-4">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold">{job.title}</h3>
                <button onClick={onEdit} className="p-1.5 hover:bg-gray-100 rounded">
                    <Edit size={16}/>
                </button>
            </div>

            <div className="grid grid-cols-6 gap-4 mb-4 text-sm">
                <div><p className="text-xs text-gray-500">Salary</p>{job.salary}</div>
                <div><p className="text-xs text-gray-500">Work Mode</p>{job.workMode}</div>
                <div><p className="text-xs text-gray-500">Job Type</p>{job.jobType}</div>
                <div><p className="text-xs text-gray-500">Shift</p>{job.shiftTime}</div>
                <div><p className="text-xs text-gray-500">Openings</p>{job.openings}</div>
                <div><p className="text-xs text-gray-500">Location</p>{job.location}</div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={onView}
                    className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-white rounded-md text-sm"
                >
                    View Job
                    <ExternalLink size={14}/>
                </button>
            </div>
        </div>
    );
}

/* =========================================================
   JOB LIST PAGE
========================================================= */

function MyJobPostingsPage({
                               onAddJob,
                               onViewJob,
                           }: {
    onAddJob: (job?: Job) => void;
    onViewJob: (job: Job) => void;
}) {
    const jobs: Job[] = [
        {
            id: 1,
            title: 'Photographer',
            salary: '₹20,000/month',
            workMode: 'Part Time',
            jobType: 'Permanent',
            shiftTime: 'Day Shift',
            openings: '3',
            location: 'Remote',
            education: "Bachelor's Degree",
            experience: '0-1 years',
            skills: 'Photography',
            certification: 'Any',
            benefits: 'Health Insurance',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header/>
            <Sidebar activePage="job-postings"/>

            <main className="ml-48 pt-16 p-6">
                <div className="max-w-6xl mx-auto bg-white rounded-md p-5">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-xl font-bold">Job Postings</h2>
                        <button
                            onClick={() => onAddJob()}
                            className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-white rounded-md"
                        >
                            <Plus size={18}/> Add Job Posting
                        </button>
                    </div>

                    {jobs.map((job) => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onEdit={() => onAddJob(job)}
                            onView={() => onViewJob(job)}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

/* =========================================================
   MAIN APP
========================================================= */

export default function JobPostingApp() {
    const [currentPage, setCurrentPage] = useState<'list' | 'add' | 'view'>('list');
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    return (
        <>
            {currentPage === 'list' && (
                <MyJobPostingsPage
                    onAddJob={() => setCurrentPage('add')}
                    onViewJob={(job) => {
                        setSelectedJob(job);
                        setCurrentPage('view');
                    }}
                />
            )}
        </>
    );
}
