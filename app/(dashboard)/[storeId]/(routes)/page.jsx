import prismadb from '@/lib/prismadb';

const DashboardPage = async ({ params }) => {
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
        },
    });

    return (
        <div>
            <div>Active Store: {store?.name}</div>
        </div>
    );
};

export default DashboardPage;
