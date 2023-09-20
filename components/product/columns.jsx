'use client';

import { CellAction } from '@/components/product/cell-action';
import Image from 'next/image';

export const columns = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Image
                    className="object-fit rounded-md border border-neutral-200"
                    src={row.original.image}
                    alt="image"
                    width={30}
                    height={30}
                />
                {row.original.name}
            </div>
        ),
    },
    {
        accessorKey: 'isArchived',
        header: 'Archived',
    },
    {
        accessorKey: 'isFeatured',
        header: 'Featured',
    },
    {
        accessorKey: 'price',
        header: 'Price',
    },
    {
        accessorKey: 'category',
        header: 'Category',
    },
    {
        accessorKey: 'size',
        header: 'Size',
    },
    {
        accessorKey: 'color',
        header: 'Color',
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                <div
                    className="h-6 w-6 rounded-full border"
                    style={{ backgroundColor: row.original.color }}
                />
            </div>
        ),
    },
    {
        accessorKey: 'createdAt',
        header: 'Date',
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
