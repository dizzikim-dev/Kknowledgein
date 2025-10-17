import { TopNav } from "@/components/top-nav"
import { PostCard } from "@/components/post-card"
import { getPosts } from "@/lib/mock-data"

export default function QuestionsPage() {
  const questions = getPosts("question")

  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="container mx-auto max-w-[1200px] px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">질문 게시판</h1>
          <p className="text-sm text-muted-foreground">{questions.length}건의 질문이 있습니다</p>
        </div>

        {questions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">아직 등록된 질문이 없습니다. 첫 번째 질문을 남겨보세요!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {questions.map((question) => (
              <PostCard key={question.id} post={question} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
