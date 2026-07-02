import type { FloorUnit } from '@/types src'

export const FLOOR_UNITS: Record<number, FloorUnit[]> = {
  12: [
    { id: '1201', floor: 12, type: 'Sky Penthouse', beds: 5, baths: 6, area: 6200, balconies: 4, status: 'available', price: 85000000 },
    { id: '1202', floor: 12, type: 'Penthouse', beds: 4, baths: 4, area: 4800, balconies: 3, status: 'reserved', price: 65000000 },
  ],
  11: [
    { id: '1101', floor: 11, type: 'Sky Villa', beds: 4, baths: 4, area: 4200, balconies: 2, status: 'available', price: 55000000 },
    { id: '1102', floor: 11, type: 'Sky Villa', beds: 3, baths: 3, area: 3400, balconies: 2, status: 'available', price: 45000000 },
  ],
  10: [
    { id: '1001', floor: 10, type: '4 Bedroom', beds: 4, baths: 3, area: 3800, balconies: 2, status: 'available', price: 42000000 },
    { id: '1002', floor: 10, type: '3 Bedroom', beds: 3, baths: 3, area: 3000, balconies: 1, status: 'sold', price: 35000000 },
    { id: '1003', floor: 10, type: '2 Bedroom', beds: 2, baths: 2, area: 2200, balconies: 1, status: 'available', price: 28000000 },
  ],
  9: [
    { id: '901', floor: 9, type: '4 Bedroom', beds: 4, baths: 3, area: 3800, balconies: 2, status: 'sold', price: 40000000 },
    { id: '902', floor: 9, type: '3 Bedroom', beds: 3, baths: 3, area: 3000, balconies: 1, status: 'available', price: 33000000 },
    { id: '903', floor: 9, type: '2 Bedroom', beds: 2, baths: 2, area: 2200, balconies: 1, status: 'reserved', price: 26000000 },
  ],
  5: [
    { id: '501', floor: 5, type: 'Penthouse', beds: 3, baths: 3, area: 3200, balconies: 2, status: 'available', price: 45000000 },
    { id: '502', floor: 5, type: '4 Bed Penthouse', beds: 4, baths: 4, area: 4850, balconies: 3, status: 'available', price: 58000000 },
    { id: '503', floor: 5, type: '3 Bedroom', beds: 3, baths: 3, area: 2800, balconies: 1, status: 'reserved', price: 32000000 },
    { id: '504', floor: 5, type: '2 Bedroom', beds: 2, baths: 2, area: 1900, balconies: 1, status: 'sold', price: 22000000 },
  ],
}