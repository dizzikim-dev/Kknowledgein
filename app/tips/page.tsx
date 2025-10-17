import { TopNav } from "@/components/top-nav"
import { PostCard } from "@/components/post-card"
import { BestTipCarousel } from "@/components/best-tip-carousel"
import { getPosts, getBestTips } from "@/lib/mock-data"

export default function TipsPage() {
  const tips = getPosts("tip")
  const bestTips = getBestTips()

  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="container mx-auto max-w-[1200px] px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">TIP 게시판</h1>
          <p className="text-sm text-muted-foreground">{tips.length}건의 TIP이 있습니다</p>
        </div>

        <BestTipCarousel tips={bestTips} />

        {tips.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">아직 등록된 TIP이 없습니다. 첫 번째 TIP을 공유해보세요!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tips.map((tip) => (
              <PostCard key={tip.id} post={tip} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
