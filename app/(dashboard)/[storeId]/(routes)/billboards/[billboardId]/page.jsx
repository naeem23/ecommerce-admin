import { BillboardForm } from '@/components/billboard/BillboardForm';
import prismadb from '@/lib/prismadb';

const BillboardPage = async ({ params }) => {
    let billboard;

    if (params.billboardId !== 'new') {
        billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId,
            },
        });
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm initialData={billboard} />
            </div>
        </div>
    );
};

export default BillboardPage;
