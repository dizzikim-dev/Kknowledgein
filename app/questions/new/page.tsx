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
import { addPost, getCurrentUser, getPosts } from "@/lib/mock-data"
import type { Post, AgentReply } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

export default function NewQuestionPage() {
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

  const generateAgentReply = (title: string, content: string): AgentReply | undefined => {
    const text = (title + " " + content).toLowerCase()

    if (text.includes("나라장터") || text.includes("제안서")) {
      return {
        replyType: "tip_citation",
        text: "다음 TIP 문서가 도움이 될 수 있어요. 또한 '공공제안 프로세스' 담당 부서 안내는 아래 그래프를 참고하세요.",
        tipLinks: [{ id: "t101", title: "국가입찰(나라장터) 제안서 템플릿 모음 (2025년 2분기)" }],
        graphProof: {
          nodes: [
            { id: "n1", label: "나라장터 제안", type: "Topic" },
            { id: "n2", label: "공공사업제안팀", type: "Dept" },
            { id: "n3", label: "박*서", type: "Person" },
          ],
          edges: [
            { from: "n1", to: "n2", label: "담당" },
            { from: "n2", to: "n3", label: "담당자" },
          ],
        },
      }
    }

    if (text.includes("절체") || text.includes("인터링크") || text.includes("알람")) {
      return {
        replyType: "dept_graph",
        text: "표준 절차에 따르면 네트워크운영팀 1차 → 전송운용파트 2차 협업 순서입니다. 간단 경로를 표시합니다.",
        graphProof: {
          nodes: [
            { id: "m1", label: "링 알람 대응", type: "Topic" },
            { id: "m2", label: "네트워크운영팀", type: "Dept" },
            { id: "m3", label: "전송운용파트", type: "Dept" },
          ],
          edges: [
            { from: "m1", to: "m2", label: "1차" },
            { from: "m2", to: "m3", label: "2차" },
          ],
        },
      }
    }

    return undefined
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
    const questions = getPosts("question")
    const maxIndexNo = Math.max(...questions.map((q) => q.indexNo), 1000)

    const newPost: Post = {
      id: `q${Date.now()}`,
      board: "question",
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
      agentReply: generateAgentReply(title, content),
      comments: [],
    }

    addPost(newPost)

    toast({
      title: "질문이 등록되었습니다.",
      description: "에이전트가 자동으로 답변을 생성했습니다.",
    })

    router.push(`/questions/${newPost.id}`)
  }

  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="container mx-auto max-w-[1200px] px-4 py-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">질문하기</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">제목</label>
              <Input placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">내용</label>
              <Textarea
                placeholder="질문 내용을 입력하세요&#10;&#10;• 구체적인 상황을 설명해주세요&#10;• 관련 부서나 시스템 정보를 포함하면 더 정확한 답변을 받을 수 있습니다&#10;• 마크다운 문법을 사용할 수 있습니다"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
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
                {isSubmitting ? "등록 중..." : "질문 등록"}
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
