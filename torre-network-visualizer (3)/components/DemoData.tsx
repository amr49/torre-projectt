// بيانات تجريبية محسنة مع معلومات كاملة
export const demoNodes = [
  {
    id: "demo1",
    username: "sarah_dev",
    name: "Sarah Johnson",
    picture: "/placeholder.svg?height=48&width=48",
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "GraphQL", "Next.js", "Redux", "MongoDB"],
    companies: ["Google", "Stripe", "Airbnb"],
    location: "San Francisco, CA",
  },
  {
    id: "demo2",
    username: "mike_design",
    name: "Mike Chen",
    picture: "/placeholder.svg?height=48&width=48",
    skills: [
      "UI/UX Design",
      "Figma",
      "JavaScript",
      "React",
      "Design Systems",
      "User Research",
      "Prototyping",
      "Adobe Creative Suite",
    ],
    companies: ["Airbnb", "Stripe", "Dribbble"],
    location: "San Francisco, CA",
  },
  {
    id: "demo3",
    username: "alex_data",
    name: "Alex Rodriguez",
    picture: "/placeholder.svg?height=48&width=48",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Data Analysis", "PyTorch", "Big Data", "Statistics"],
    companies: ["Netflix", "Uber", "Amazon"],
    location: "New York, NY",
  },
  {
    id: "demo4",
    username: "emma_product",
    name: "Emma Wilson",
    picture: "/placeholder.svg?height=48&width=48",
    skills: [
      "Product Management",
      "Analytics",
      "SQL",
      "A/B Testing",
      "Strategy",
      "User Stories",
      "Roadmapping",
      "Agile",
    ],
    companies: ["Google", "Meta", "Microsoft"],
    location: "Seattle, WA",
  },
  {
    id: "demo5",
    username: "david_backend",
    name: "David Kim",
    picture: "/placeholder.svg?height=48&width=48",
    skills: ["Node.js", "Python", "AWS", "Docker", "GraphQL", "PostgreSQL", "Microservices", "Kubernetes"],
    companies: ["Amazon", "Netflix", "Twitch"],
    location: "Seattle, WA",
  },
  {
    id: "demo6",
    username: "lisa_mobile",
    name: "Lisa Patel",
    picture: "/placeholder.svg?height=48&width=48",
    skills: ["React Native", "Swift", "Kotlin", "JavaScript", "Mobile Design", "Firebase", "Redux", "iOS Development"],
    companies: ["Uber", "Lyft", "Airbnb"],
    location: "San Francisco, CA",
  },
  {
    id: "demo7",
    username: "james_devops",
    name: "James Wilson",
    picture: "/placeholder.svg?height=48&width=48",
    skills: ["DevOps", "Kubernetes", "Docker", "AWS", "CI/CD", "Terraform", "Linux", "Jenkins"],
    companies: ["Google", "Amazon", "Microsoft"],
    location: "Seattle, WA",
  },
  {
    id: "demo8",
    username: "maria_ai",
    name: "Maria Garcia",
    picture: "/placeholder.svg?height=48&width=48",
    skills: [
      "Machine Learning",
      "Python",
      "TensorFlow",
      "NLP",
      "Computer Vision",
      "Data Science",
      "PyTorch",
      "Deep Learning",
    ],
    companies: ["OpenAI", "Google", "Meta"],
    location: "San Francisco, CA",
  },
  {
    id: "demo9",
    username: "ahmed_fullstack",
    name: "Ahmed Hassan",
    picture: "/placeholder.svg?height=48&width=48",
    skills: [
      "Full Stack Development",
      "React",
      "Node.js",
      "MongoDB",
      "Express.js",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
    ],
    companies: ["Shopify", "Stripe", "Vercel"],
    location: "Toronto, Canada",
  },
  {
    id: "demo10",
    username: "fatima_security",
    name: "Fatima Al-Zahra",
    picture: "/placeholder.svg?height=48&width=48",
    skills: [
      "Cybersecurity",
      "Penetration Testing",
      "Network Security",
      "Python",
      "Ethical Hacking",
      "Security Auditing",
      "Incident Response",
      "Risk Assessment",
    ],
    companies: ["CrowdStrike", "Palo Alto Networks", "FireEye"],
    location: "Dubai, UAE",
  },
]

export const demoLinks = [
  {
    source: "demo1",
    target: "demo2",
    strength: 5,
    type: "skill" as const,
    sharedItems: ["JavaScript", "React", "Stripe", "Airbnb", "San Francisco"],
  },
  {
    source: "demo1",
    target: "demo5",
    strength: 4,
    type: "skill" as const,
    sharedItems: ["JavaScript", "Node.js", "GraphQL", "MongoDB"],
  },
  {
    source: "demo1",
    target: "demo6",
    strength: 4,
    type: "skill" as const,
    sharedItems: ["JavaScript", "React", "Redux"],
  },
  {
    source: "demo1",
    target: "demo9",
    strength: 6,
    type: "skill" as const,
    sharedItems: ["React", "Node.js", "TypeScript", "Next.js", "MongoDB"],
  },
  {
    source: "demo2",
    target: "demo6",
    strength: 3,
    type: "company" as const,
    sharedItems: ["Airbnb", "Design", "San Francisco"],
  },
  {
    source: "demo3",
    target: "demo5",
    strength: 2,
    type: "skill" as const,
    sharedItems: ["Python"],
  },
  {
    source: "demo3",
    target: "demo8",
    strength: 6,
    type: "skill" as const,
    sharedItems: ["Python", "Machine Learning", "TensorFlow", "Data Analysis", "PyTorch", "Data Science"],
  },
  {
    source: "demo3",
    target: "demo10",
    strength: 2,
    type: "skill" as const,
    sharedItems: ["Python", "Data Analysis"],
  },
  {
    source: "demo4",
    target: "demo7",
    strength: 3,
    type: "company" as const,
    sharedItems: ["Google", "Microsoft", "Seattle"],
  },
  {
    source: "demo4",
    target: "demo1",
    strength: 2,
    type: "company" as const,
    sharedItems: ["Google"],
  },
  {
    source: "demo5",
    target: "demo7",
    strength: 5,
    type: "skill" as const,
    sharedItems: ["AWS", "Docker", "Kubernetes", "Microservices"],
  },
  {
    source: "demo5",
    target: "demo9",
    strength: 3,
    type: "skill" as const,
    sharedItems: ["Node.js", "MongoDB"],
  },
  {
    source: "demo6",
    target: "demo8",
    strength: 2,
    type: "location" as const,
    sharedItems: ["San Francisco, CA"],
  },
  {
    source: "demo7",
    target: "demo5",
    strength: 4,
    type: "skill" as const,
    sharedItems: ["AWS", "Docker", "Kubernetes"],
  },
  {
    source: "demo8",
    target: "demo4",
    strength: 2,
    type: "company" as const,
    sharedItems: ["Google", "Meta"],
  },
  {
    source: "demo9",
    target: "demo1",
    strength: 5,
    type: "skill" as const,
    sharedItems: ["React", "Node.js", "TypeScript", "Next.js"],
  },
  {
    source: "demo10",
    target: "demo3",
    strength: 2,
    type: "skill" as const,
    sharedItems: ["Python"],
  },
]
