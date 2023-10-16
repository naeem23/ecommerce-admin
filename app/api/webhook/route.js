import Stripe from 'stripe';
import { headers } from 'next/headers';

import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function POST(req) {
    const body = await req.text();
    const signature = headers().get('Stripe-Signature');

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        return new NextResponse(`Webhook error: ${error.message}`, {
            status: 400,
        });
    }

    const session = event.data.object;
    const address = session?.customer_details?.address;

    const addressComponents = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.state,
        address?.postal_code,
        address?.country,
    ];

    const addressString = addressComponents
        .filter((field) => field !== null)
        .join(', ');

    if (event.type === 'checkout.session.completed') {
        const order = await prismadb.order.update({
            where: {
                id: session?.metadata?.orderId,
            },
            data: {
                isPaid: true,
                address: addressString,
                phone: session?.customer_details?.phone || '',
            },
            include: {
                orderItems: true,
            },
        });

        const productIds = order.orderItems.map((item) => item.productId);

        await prismadb.product.udpateMany({
            where: {
                id: {
                    in: [...productIds],
                },
            },
            data: {
                isArchived: true,
            },
        });
    }

    return new NextResponse(null, { status: 200 });
}
