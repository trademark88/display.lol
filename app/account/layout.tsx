import { SideNav } from "@/components/component/side-nav";

export default function Layout({ children }: any) {
    return (
      <html lang="en">
        <body>
            <SideNav/>
          {children}
        </body>
      </html>
    )
  }