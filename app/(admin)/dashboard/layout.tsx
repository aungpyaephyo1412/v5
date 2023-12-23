import { ReactNode } from 'react';
import Link from 'next/link';
import { AdminDashboardSideBar } from '@/components';

const DashboarLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='relative w-full'>
            <nav className='fixed left-0 right-0 top-0 z-50 border-b border-b-gray-600 bg-zinc-800 px-5 py-2'>
                <Link
                    href={'/dashboard'}
                    className='text-3xl font-semibold text-slate-200'
                >
                    Dashboard
                </Link>
            </nav>
            <div className='flex w-full'>
                <AdminDashboardSideBar />
                <div className='flex-1 px-5 pb-[200px] pt-[60px]'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboarLayout;
