'use client';

import type { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Home, FlaskConical, ClipboardCheck, MessageSquareText, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Logo from 'public/placeholder.svg'; // Import the SVG

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Function to determine if a link is active
  const isActive = (href: string) => pathname === href;

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-primary" /> {/* Use the imported SVG component */}
            <span className="text-lg font-semibold">EnviroClean</span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/" passHref legacyBehavior>
                <SidebarMenuButton tooltip="Home" isActive={isActive('/')}>
                  <Home />
                  <span>Home</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/simulations" passHref legacyBehavior>
                <SidebarMenuButton tooltip="Simulations" isActive={isActive('/simulations')}>
                  <FlaskConical />
                  <span>Simulations</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/knowledge-checks" passHref legacyBehavior>
                <SidebarMenuButton tooltip="Knowledge Checks" isActive={isActive('/knowledge-checks')}>
                  <ClipboardCheck />
                  <span>Knowledge Checks</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/feedback" passHref legacyBehavior>
                <SidebarMenuButton tooltip="Feedback" isActive={isActive('/feedback')}>
                  <MessageSquareText />
                  <span>Feedback</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
           <SidebarMenu>
             <SidebarMenuItem>
                <Link href="/settings" passHref legacyBehavior>
                 <SidebarMenuButton tooltip="Settings" isActive={isActive('/settings')}>
                    <Settings />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </Link>
             </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between border-b p-4 md:justify-end">
          <SidebarTrigger className="md:hidden" />
          {/* Add user profile/login button here if needed */}
          <Button variant="outline" size="sm">Login</Button>
        </header>
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
