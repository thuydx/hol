'use client'

import ViewsLayout from '@/views/layout'

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ViewsLayout>
            {children}
      </ViewsLayout>
    </>
  )
}
