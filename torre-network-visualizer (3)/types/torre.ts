export interface TorreUser {
  id: string
  username: string
  name: string
  professionalHeadline?: string
  picture?: string
  location?: {
    name: string
    country: string
  }
  skills?: Skill[]
  experiences?: Experience[]
  connections?: Connection[]
}

export interface Skill {
  id: string
  name: string
  weight: number
  recommendations: number
}

export interface Experience {
  id: string
  name: string
  category: string
  organizations?: Organization[]
}

export interface Organization {
  id: string
  name: string
  picture?: string
}

export interface Connection {
  source: string
  target: string
  strength: number
  type: "skill" | "company" | "location"
  sharedItems: string[]
}

export interface NetworkNode {
  id: string
  username: string
  name: string
  picture?: string
  skills: string[]
  companies: string[]
  location?: string
  x?: number
  y?: number
  fx?: number
  fy?: number
}

export interface NetworkLink {
  source: string
  target: string
  strength: number
  type: "skill" | "company" | "location"
  sharedItems: string[]
}
