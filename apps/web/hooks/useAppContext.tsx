import React, { createContext, useState } from 'react'

interface AppContextType {
  token: string
  // eslint-disable-next-line no-unused-vars
  setToken: (token: string) => void
}

export const AppContext = createContext<AppContextType>({
  token: '',
  setToken: (token: string) => {
    token
  },
})

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [token, setToken] = useState('')

  return (
    <AppContext.Provider value={{ token, setToken }}>
      {children}
    </AppContext.Provider>
  )
}
