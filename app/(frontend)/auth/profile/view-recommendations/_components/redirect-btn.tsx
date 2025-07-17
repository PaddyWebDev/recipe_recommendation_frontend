"use client"
import { Button } from '@/components/ui/button'
import React from 'react'


interface RedirectBtnProps {
    url: string,
    classname: string,
    children: React.ReactNode
    variant: any
}

export default function RedirectBtn({ url, classname, children, variant }: RedirectBtnProps) {
    return (
        <Button
            className={classname}
            onClick={() => window.open(url, "_blank")}
            variant={variant || "default"}
        >
            {children}
        </Button>
    )
}
