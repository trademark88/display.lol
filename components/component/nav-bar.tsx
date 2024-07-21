import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiActivity } from "react-icons/fi";
import Image from "next/image";
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'


export function NavBar() {
  const cookieStore = cookies()
  const jwt_token = cookieStore.get('jwt_token')


  return (
    <div className="flex justify-center">
      <header className="fixed top-0 z-50 bg-secondary shadow-sm rounded-full w-2/3 mt-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium text-primary-foreground transition-colors hover:text-primary-foreground">
              Home
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-primary-foreground transition-colors hover:text-primary-foreground">
              Pricing
            </Link>
            <Link href="/contact" className="text-sm font-medium text-primary-foreground transition-colors hover:text-primary-foreground">
              Contact
            </Link>
          </nav>
          <div className="flex items-center justify-center h-screen">
            {
              !jwt_token &&   <Link 
              href="/auth/register"
              className="text-sm bg-primary rounded-full text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 p-4 glow-effect">
              Register today
            </Link> 
            }
            {
              jwt_token && 
              <Link 
              href="/account"
              className="text-sm bg-primary rounded-full text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 p-4 glow-effect">
              Dasboard
            </Link> 
            }
          
          </div>
        </div>
      </header>
    </div>
  );
}

function MountainIcon(props: any) {
  return (
    <div className="flex items-center">
      <Image src="/img/display2.png" width={50} height={50} alt="display" />
      <h1 className="ml-4">Display.lol</h1>
    </div>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}