'use client'

import React, { createContext, useContext, useState } from 'react'

interface Filters {
  gender: string
  size: string
  priceMin: number
  priceMax: number
  ethical: boolean
}

interface FilterContextType {
  filters: Filters
  setGender: (value: string) => void
  setSize: (value: string) => void
  setPrice: (value: [number, number]) => void
  setEthical: (value: boolean) => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [gender, setGender] = useState('all')
  const [size, setSize] = useState('all')
  const [price, setPrice] = useState<[number, number]>([0, 250])
  const [ethical, setEthical] = useState(false)

  const filters: Filters = {
    gender,
    size,
    priceMin: price[0],
    priceMax: price[1],
    ethical
  }

  return (
    <FilterContext.Provider
      value={{
        filters,
        setGender,
        setSize,
        setPrice,
        setEthical
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilters must be used within FilterProvider')
  }
  return context
}