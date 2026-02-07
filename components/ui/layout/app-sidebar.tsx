"use client"

import * as React from "react"
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

import Image from "next/image";

export function AppSidebar() {
  return (
    <Sidebar>
      <Image
        src="/logo2.png"
        alt="logo"
        width={100}
        height={100}
        className=""
      />
      <SidebarHeader>hello</SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
