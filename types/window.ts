export interface WindowType {
  id: string
  name: string
  image: string
  basePrice: number
}

export interface WindowSelection extends WindowType {
  dirtiness: number
  gluePercentage: number
  height: number
  quantity: number
}

export const DIRTINESS_LEVELS = [
  { label: 'A Little Dusty', multiplier: 1 },
  { label: 'Slightly Dirty', multiplier: 1.2 },
  { label: 'Moderately Dirty', multiplier: 1.4 },
  { label: 'Quite Dirty', multiplier: 1.6 },
  { label: 'Very Dirty', multiplier: 1.8 },
  { label: 'Extremely Dirty', multiplier: 2 },
  { label: 'Severely Dirty', multiplier: 2.3 },
  { label: 'Needs Restoration', multiplier: 2.5 }
]