import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

export function Header() {
  const { pathname } = useRouter()
  console.log('Header pathname', pathname)
  const [user] = useState({ isLoggedIn: false, avatarUrl: '' })
  const router = useRouter()

  return (
    <header>
      <nav className="header-container nav-div-shadow">
        <ul className="left-ul">
          <li className="li">
            <Link
              href="/editor"
              className={pathname === '/editor' ? 'nav-active' : ''}
            >
              Home
            </Link>
          </li>

          <li className="li">
            <Link
              href="/containers"
              className={pathname === '/containers' ? 'nav-active' : ''}
            >
              Containers
            </Link>
          </li>

          <li className="li">
            <Link
              href="/images"
              className={pathname === '/images' ? 'nav-active' : ''}
            >
              Images
            </Link>
          </li>

          <li className="li">
            <Link
              href="/images"
              className={pathname === '/images' ? 'nav-active' : ''}
            >
              Images
            </Link>
          </li>

          <li className="li">
            <Link
              href="/crypto/balances"
              className={pathname === '/crypto/balances' ? 'nav-active' : ''}
            >
              balances
            </Link>
          </li>
        </ul>

        <ul className="right-ul">
          {user?.isLoggedIn === false && (
            <li>
              <Link href="/login" legacyBehavior>
                <a>Login</a>
              </Link>
            </li>
          )}
          {user?.isLoggedIn === true && (
            <>
              <li>
                <Link href="/profile-sg" legacyBehavior>
                  <a>
                    <span
                      style={{
                        marginRight: '.3em',
                        verticalAlign: 'middle',
                        borderRadius: '100%',
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src={user.avatarUrl}
                        width={32}
                        height={32}
                        alt=""
                      />
                    </span>
                    Profile (Static Generation, recommended)
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/profile-ssr" legacyBehavior>
                  <a>Profile (Server-side Rendering)</a>
                </Link>
              </li>
              <li>
                <a
                  href="/api/logout"
                  onClick={async (e) => {
                    e.preventDefault()
                    // mutateUser(
                    //   await fetchJson('/api/logout', { method: 'POST' }),
                    //   false
                    // )
                    router.push('/login')
                  }}
                >
                  Logout
                </a>
              </li>
            </>
          )}
          <li>
            <a href="https://github.com/vvo/iron-session">
              <Image
                src="/GitHub-Mark-Light-32px.png"
                width="32"
                height="32"
                alt=""
              />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
