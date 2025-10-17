"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TopNav } from "@/components/top-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { addPost, getCurrentUser, getPosts, updateUserPoints } from "@/lib/mock-data"
import type { Post } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

export default function NewTipPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "입력 오류",
        description: "제목과 내용을 모두 입력해주세요.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    const currentUser = getCurrentUser()
    const tips = getPosts("tip")
    const maxIndexNo = Math.max(...tips.map((t) => t.indexNo), 500)

    const newPost: Post = {
      id: `t${Date.now()}`,
      board: "tip",
      indexNo: maxIndexNo + 1,
      title,
      content,
      authorNameMasked: currentUser.name.charAt(0) + "*" + currentUser.name.charAt(2),
      authorDept: currentUser.deptTeamName,
      createdAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      dislikes: 0,
      tags: tags.length > 0 ? tags : undefined,
      bestTip: false,
      comments: [],
    }

    addPost(newPost)
    updateUserPoints(currentUser.id, 100)

    toast({
      title: "많은 분들에게 도움되는 유용한 TIP을 작성해주셔서 감사합니다!",
      description: "포인트를 제공드렸으니 확인 부탁드려요! (+100p)",
    })

    router.push(`/tips/${newPost.id}`)
  }

  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="container mx-auto max-w-[1200px] px-4 py-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">TIP 작성</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">제목</label>
              <Input placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">내용</label>
              <Textarea
                placeholder="TIP 내용을 입력하세요&#10;&#10;• 다른 직원들에게 도움이 될 만한 정보를 공유해주세요&#10;• 업무 노하우, 프로세스, 유용한 자료 등&#10;• 마크다운 문법을 사용할 수 있습니다"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="resize-none font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">태그</label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="태그를 입력하고 Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddTag()
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTag} variant="outline">
                  추가
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "등록 중..." : "TIP 등록"}
              </Button>
              <Button variant="outline" onClick={() => router.back()}>
                취소
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
