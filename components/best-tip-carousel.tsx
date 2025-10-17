import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, ThumbsUp } from "lucide-react"
import type { Post } from "@/lib/mock-data"

interface BestTipCarouselProps {
  tips: Post[]
}

export function BestTipCarousel({ tips }: BestTipCarouselProps) {
  if (tips.length === 0) return null

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Best TIP</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tips.map((tip) => (
          <Link key={tip.id} href={`/tips/${tip.id}`}>
            <Card className="p-4 h-full hover:bg-accent/50 transition-colors cursor-pointer">
              <Badge variant="default" className="mb-3 bg-accent">
                Best TIP
              </Badge>
              <h3 className="font-medium text-base leading-snug mb-3 line-clamp-2">{tip.title}</h3>
              <div className="text-sm text-muted-foreground mb-3">
                {tip.authorDept} {tip.authorNameMasked}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{tip.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{tip.likes}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
