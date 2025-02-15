import type React from "react"
import { CalendarDays, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

export const Events: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <h1 className="text-4xl font-bold text-center mb-12">CycleMaster in International Competitions</h1>
      <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
        Our cutting-edge bicycles and passionate riders are making waves in international competitions. See where
        CycleMaster products are pushing the limits of cycling performance.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  )
}

interface Event {
  name: string
  date: string
  location: string
  description: string
  achievement: string
  image: string
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <Card className="overflow-hidden">
      <img src={event.image || "/placeholder.svg"} alt={event.name} className="w-full h-48 object-cover" />
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{event.name}</CardTitle>
          <Badge variant="secondary">{event.achievement}</Badge>
        </div>
        <CardDescription className="flex items-center mt-2">
          <CalendarDays className="w-4 h-4 mr-2" />
          {event.date}
        </CardDescription>
        <CardDescription className="flex items-center mt-1">
          <MapPin className="w-4 h-4 mr-2" />
          {event.location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{event.description}</p>
      </CardContent>
    </Card>
  )
}

const events: Event[] = [
  {
    name: "Tour de France",
    date: "July 1-23, 2023",
    location: "France",
    description: "Our CycleMaster Pro-X bike helped Team Velocity secure a top 5 finish in the general classification.",
    achievement: "Top 5 Finish",
    image: "/image_1.avif",
  },
  {
    name: "UCI Mountain Bike World Cup",
    date: "May 12-14, 2023",
    location: "Nové Město na Moravě, Czech Republic",
    description:
      "CycleMaster's AllTerrain-X bike powered Sarah Johnson to a gold medal in the women's cross-country event.",
    achievement: "Gold Medal",
    image: "/image_3.jpg",
  },
  {
    name: "Giro d'Italia",
    date: "May 6-28, 2023",
    location: "Italy",
    description: "Team Altitude, riding CycleMaster Elite-R bikes, clinched the team classification title.",
    achievement: "Team Classification Win",
    image: "/image_2.jpg",
  },
  {
    name: "Red Bull Rampage",
    date: "October 14, 2023",
    location: "Virgin, Utah, USA",
    description:
      "Freestyle rider Mike Trailblazer showcased the durability of our Freeride-X bike, securing a podium finish.",
    achievement: "3rd Place",
    image: "/image_5.jpg",
  },
  {
    name: "Paris-Roubaix",
    date: "April 9, 2023",
    location: "France",
    description:
      "The CycleMaster Cobble-Master bike helped Team Endurance navigate the treacherous cobblestones to a top 10 finish.",
    achievement: "Top 10 Finish",
    image: "/tropy.jpg",
  },
  {
    name: "Cape Epic",
    date: "March 19-26, 2023",
    location: "Western Cape, South Africa",
    description:
      "Our DuoTech-X tandem mountain bike carried the Johnson-Smith duo to victory in this grueling stage race.",
    achievement: "Overall Winners",
    image: "/iamge_4.jpeg",
  },
]

