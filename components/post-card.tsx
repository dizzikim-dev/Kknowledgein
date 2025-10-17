import Link from "next/link"
import { Eye, ThumbsUp, MessageSquare } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Post } from "@/lib/mock-data"
import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const href = post.board === "question" ? `/questions/${post.id}` : `/tips/${post.id}`

  return (
    <Link href={href}>
      <Card className="p-4 hover:shadow-md transition-all cursor-pointer rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-2">
              {post.bestTip && (
                <Badge
                  variant="default"
                  className="shrink-0"
                  style={{ backgroundColor: "var(--primary)", color: "white" }}
                >
                  Best TIP
                </Badge>
              )}
              <h3 className="font-semibold text-base leading-snug line-clamp-2">{post.title}</h3>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="text-xs">#{post.indexNo}</span>
              <span>•</span>
              <span>
                {post.authorDept} {post.authorNameMasked}
              </span>
              <span>•</span>
              <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: ko })}</span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs rounded-full border hover:border-[var(--primary)] transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground shrink-0">
            <div className="flex items-center gap-1" title="조회수">
              <Eye className="h-4 w-4" aria-hidden="true" />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center gap-1" title="좋아요">
              <ThumbsUp className="h-4 w-4" aria-hidden="true" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-1" title="댓글">
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              <span>{post.comments.length}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
