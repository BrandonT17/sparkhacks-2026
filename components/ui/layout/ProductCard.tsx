import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"

interface ProductCardProps {
  title: string
  image: string
  price: string
  link: string
}

export default function ProductCard({ title, image, price, link }: ProductCardProps) {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block transition-transform hover:scale-105"
    >
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader className="p-4">
          <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden">
            <img
              src={image}
              alt={title}
              className="object-contain w-full h-full"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.png'
              }}
            />
          </div>
        </CardHeader>

        <CardContent className="p-4 pb-0 pt-0">
          <h3 className="font-semibold text-sm line-clamp-2 min-h-[40px]">
            {title}
          </h3>
        </CardContent>

        <CardFooter className="p-4 pt-0 pb-0">
          <p className="text-lg font-bold">
            {price}
          </p>
        </CardFooter>
      </Card>
    </a>
  )
}