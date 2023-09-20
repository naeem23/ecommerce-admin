'use client';

import toast from 'react-hot-toast';
import axios from 'axios';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { AlertModal } from '@/components/modals/AlertModal';

export const CellAction = ({ data }) => {
    const router = useRouter();
    const params = useParams();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/products/${data.id}`);
            toast.success('Product deleted.');
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong.');
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    const onCopy = (id) => {
        navigator.clipboard.writeText(id);
        toast.success('Product ID copied to clipboard.');
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuItem
                        onClick={() => onCopy(data.id)}
                        className="cursor-pointer"
                    >
                        <Copy className="mr-2 h-4 w-4" /> Copy ID
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() =>
                            router.push(
                                `/${params.storeId}/products/${data.id}`
                            )
                        }
                        className="cursor-pointer"
                    >
                        <Edit className="mr-2 w-4 h-4" /> Update
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => setOpen(true)}
                        className="cursor-pointer"
                    >
                        <Trash className="mr-2 w-4 h-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
