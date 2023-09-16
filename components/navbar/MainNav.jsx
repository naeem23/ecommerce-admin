'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export const MainNav = ({ className, ...props }) => {
    const pathName = usePathname();
    const params = useParams();

    const routes = [
        {
            id: 1,
            href: `/${params.storeId}`,
            label: 'Overview',
            active: pathName === `/${params.storeId}`,
        },
        {
            id: 2,
            href: `/${params.storeId}/settings`,
            label: 'Settings',
            active: pathName === `/${params.storeId}/settings`,
        },
    ];
    return (
        <nav
            className={cn(
                'flex items-center space-x-4 lg:space-x-6',
                className
            )}
            {...props}
        >
            {routes.map((route) => (
                <>
                    <Link
                        key={route.id}
                        href={route.href}
                        className={cn(
                            'text-sm font-medium transition-colors hover:text-primary',
                            route.active
                                ? 'text-black dark:text-white'
                                : 'text-muted-foreground'
                        )}
                    >
                        {route.label}
                    </Link>
                </>
            ))}
        </nav>
    );
};
