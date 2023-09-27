import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';
import { formatter } from '@/lib/utils';
import { OrderClient } from '@/components/order/order-client';

const OrdersPage = async ({ params }) => {
    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    const formattedOrders = orders.map((item) => ({
        id: item.id,
        isPaid: item.isPaid,
        phone: item.phone,
        address: item.address,
        products: item.orderItems
            .map((orderItem) => orderItem.product.name)
            .join(', '),
        totalPrice: formatter.format(
            item.orderItems.reduce((total, orderItem) => {
                return total + Number(orderItem.product.price);
            }, 0)
        ),
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOrders} />
            </div>
        </div>
    );
};

export default OrdersPage;
