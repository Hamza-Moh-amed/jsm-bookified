"use client"
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const navItems = [
    {lable: "Library", href: "/"},
    {lable: "Add new", href: "/books/add-new"}
]

const Navbar = () => {
  const pathName= usePathname()
    return (
    <header
    className="w-full fixed z-50 bg-('--bg-primary')"
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
            </nav>

        </div>
    </header>
  )
}

export default Navbar