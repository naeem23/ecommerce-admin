import { format } from 'date-fns';

import { SizeClient } from '@/components/size/size-client';
import prismadb from '@/lib/prismadb';

const SizesPage = async ({ params }) => {
    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    const formattedSizes = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeClient data={formattedSizes} />
            </div>
        </div>
    );
};

export default SizesPage;
