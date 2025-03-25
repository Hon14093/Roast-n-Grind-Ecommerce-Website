import * as React from "react"
import {
  Coffee,
  FileSliders,
  ChartColumn
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
      icon: ChartColumn,
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
          title: "Duyệt đơn hàng",
          url: "http://localhost:5173/admin/check-orders",
        },
        {
          title: "Sản phẩm",
          url: "http://localhost:5173/admin/products",
        },
      ],
    },
    
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className='bg-darkOlive text-ivory'>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent className='bg-darkOlive text-ivory'>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter className='bg-darkOlive text-ivory'>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
