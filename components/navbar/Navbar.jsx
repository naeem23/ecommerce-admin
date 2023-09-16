import { auth, UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { MainNav } from '@/components/navbar/MainNav';
import { StoreSwitcher } from '@/components/navbar/StoreSwitcher';
import prismadb from '@/lib/prismadb';

const Navbar = async () => {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId,
        },
    });

    return (
        <div className="border-b">
            <div className="flex items-center h-16 px-4">
                <StoreSwitcher items={stores} />
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
