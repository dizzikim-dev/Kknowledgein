"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { ThumbsUp } from "lucide-react"
import type { Comment } from "@/lib/mock-data"
import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"

interface CommentSectionProps {
  comments: Comment[]
  onAddComment: (content: string) => void
}

export function CommentSection({ comments, onAddComment }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)
    await onAddComment(newComment)
    setNewComment("")
    setIsSubmitting(false)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">댓글 {comments.length > 0 && `(${comments.length})`}</h3>

      {comments.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4">첫 댓글을 남겨보세요.</p>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <Card key={comment.id} className="p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="text-sm">
                  <span className="font-medium">
                    {comment.authorDept} {comment.authorNameMasked}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: ko })}
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="shrink-0">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {comment.likes}
                </Button>
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{comment.content}</p>
            </Card>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <Textarea
          placeholder="댓글을 입력하세요…"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
          className="resize-none"
        />
        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={isSubmitting || !newComment.trim()}>
            등록
          </Button>
        </div>
      </div>
    </div>
  )
}
