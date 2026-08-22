"use client"
import { cn } from '@/lib/utils'
import { ClerkLoaded, ClerkLoading, Show, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const navItems = [
    {lable: "Library", href: "/"},
    {lable: "Add new", href: "/books/new"}
]

const Navbar = () => {
  const pathName= usePathname()
  const {user} = useUser()
    return (
    <header
    className="w-full fixed z-50 bg-(--bg-primary)"
    >
        <div className='wrapper navbar-height py-4 flex justify-between items-center'>
            <Link
            href="/"
            className='flex gap-0.5 items-center'
            >
                <Image
                src="/logo.png"
                alt='Bookified'
                width={42}
                height={26}
                />
                <span className='logo-text'>Bookified</span>
            </Link>

            <nav className='w-fit flex gap-7.5 items-center'>
                {navItems.map(({lable, href}) => {
                    const isActive = pathName === href || (href !== '/' && pathName.startsWith(href));
                    return(
                        <Link
                        href={href}
                        key={lable}
                        className={cn("nav-link-base", isActive ? "nav-link-active" : "text-black hover:opacity-70")}
                        >
                            {lable}
                        </Link>
                    )
                })}

                <div className='flex gap-7.5 items-center'>
                 <Show when="signed-out">
                  <SignInButton />
                 </Show>

                 <Show when="signed-in">
                    <div className='nav-user-link'>
                     <UserButton />
                     {user?.firstName && <Link href="/subscriptions" className='nav-user-name'>{user.firstName}</Link> }
                    </div>
                 </Show>
                </div>
            </nav>

        </div>
    </header>
  )
}

export default Navbar