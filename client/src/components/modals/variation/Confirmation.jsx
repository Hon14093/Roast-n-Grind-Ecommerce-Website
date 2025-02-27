import React from 'react'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

export function Confirmation({ variation }) {
    return (
        <section className='flex justify-center gap-3'>
            <Button variant='secondary' className='p-5'>
                Hủy
            </Button>

            <Button variant='destructive' className='p-5'>
                <Trash2 />
                Xóa
            </Button>
        </section>
    )
}
