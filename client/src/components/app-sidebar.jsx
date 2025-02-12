import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Coffee,
  FileSliders,
  SlidersHorizontal,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "../components/nav-main"
import { NavProjects } from "../components/nav-projects"
import { NavUser } from "../components/nav-user"
import { TeamSwitcher } from "../components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../components/ui/sidebar"

// This is sample data.
const data = {
  // bottom left avatar
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Roast & Grind",
      logo: Coffee,
      plan: "Coffee beans",
    },
  ],
  navMain: [
    {
      title: "Thống kê",
      url: "http://localhost:5173/admin/analytics",
      icon: SquareTerminal,
      // items: [
      //   {
      //     title: "History",
      //     url: "#",
      //   },
      //   {
      //     title: "Starred",
      //     url: "#",
      //   },
      //   {
      //     title: "Settings",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Quản lý",
      // url: "#",
      icon: FileSliders,
      isActive: true,
      items: [
        {
          title: "Khuyến mãi",
          url: "http://localhost:5173/admin/discounts",
        },
        {
          title: "Tài khoản",
          url: "http://localhost:5173/admin/accounts",
        },
        {
          title: "Đơn hàng",
          url: "http://localhost:5173/admin/orders",
        },
        {
          title: "Sản phẩm",
          url: "http://localhost:5173/admin/products",
        },
      ],
    },
    
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
