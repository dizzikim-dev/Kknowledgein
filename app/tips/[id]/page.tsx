"use client"

import { TopNav } from "@/components/top-nav"
import { CommentSection } from "@/components/comment-section"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, Eye } from "lucide-react"
import { getPost, updatePost, getCurrentUser } from "@/lib/mock-data"
import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"
import ReactMarkdown from "react-markdown"
import { useToast } from "@/hooks/use-toast"

export default function TipDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const post = getPost(id)
  const { toast } = useToast()

  if (!post || post.board !== "tip") {
    return (
      <div className="min-h-screen">
        <TopNav />
        <main className="container mx-auto max-w-[1200px] px-4 py-8">
          <p className="text-center text-muted-foreground">TIP을 찾을 수 없습니다.</p>
        </main>
      </div>
    )
  }

  const handleAddComment = async (content: string) => {
    const currentUser = getCurrentUser()
    const newComment = {
      id: `c${Date.now()}`,
      authorNameMasked: currentUser.name.charAt(0) + "*" + currentUser.name.charAt(2),
      authorDept: currentUser.deptTeamName,
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
    }

    updatePost(id, {
      comments: [...post.comments, newComment],
    })

    toast({
      title: "댓글이 등록되었습니다",
      description: "10 포인트가 적립되었습니다.",
    })
  }

  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="container mx-auto max-w-[1200px] px-4 py-8">
        <article className="space-y-6">
          <Card className="p-6 relative">
            {post.bestTip && (
              <div className="absolute top-4 right-4">
                <Badge variant="default" className="bg-accent text-lg px-3 py-1">
                  Best TIP
                </Badge>
              </div>
            )}

            <div className="mb-4">
              <h1 className="text-2xl font-bold mb-3 leading-snug pr-24">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span>
                  {post.authorDept} {post.authorNameMasked}
                </span>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: ko })}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>조회수 {post.views}</span>
                </div>
              </div>
            </div>

            <div className="prose prose-sm max-w-none mb-6">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 pt-4 border-t">
              <Button variant="outline" size="sm">
                <ThumbsUp className="h-4 w-4 mr-1" />
                좋아요 {post.likes}
              </Button>
              <Button variant="outline" size="sm">
                <ThumbsDown className="h-4 w-4 mr-1" />
                싫어요 {post.dislikes}
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <CommentSection comments={post.comments} onAddComment={handleAddComment} />
          </Card>
        </article>
      </main>
    </div>
  )
}
