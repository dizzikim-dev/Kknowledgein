import { TopNav } from "@/components/top-nav"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCurrentUser } from "@/lib/mock-data"
import { HelpCircle, Gift } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function MePage() {
  const user = getCurrentUser()

  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="container mx-auto max-w-[1200px] px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">내 정보</h1>

        <Card className="p-6 max-w-2xl">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">부서/팀</label>
              <p className="text-lg font-medium">{user.deptTeamName}</p>
            </div>

            <div>
              <label className="text-sm text-muted-foreground">이름</label>
              <p className="text-lg font-medium">{user.name}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <label className="text-sm text-muted-foreground">포인트</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" aria-label="포인트 안내" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <div className="space-y-2 text-sm">
                        <p className="font-semibold">포인트 점수:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>답글달기: 10p</li>
                          <li>답변선정(질문자채택): 50p</li>
                          <li>TIP 작성: 100p</li>
                        </ul>
                        <p className="font-medium" style={{ color: "var(--primary)" }}>
                          1000p를 모으면 기프티슈를 드려요!
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold" style={{ color: "var(--primary)" }}>
                  {user.points}
                </p>
                <Badge variant="secondary">
                  {user.points >= 1000 ? "기프티슈 수령 가능!" : `${1000 - user.points}p 남음`}
                </Badge>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">포인트 진행률</p>
              <div className="w-full bg-secondary rounded-full h-3">
                <div
                  className="rounded-full h-3 transition-all"
                  style={{
                    width: `${Math.min((user.points / 1000) * 100, 100)}%`,
                    backgroundColor: "var(--primary)",
                  }}
                  role="progressbar"
                  aria-valuenow={user.points}
                  aria-valuemin={0}
                  aria-valuemax={1000}
                  aria-label="포인트 진행률"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1 text-right">
                {Math.min((user.points / 1000) * 100, 100).toFixed(1)}%
              </p>
            </div>

            <div
              className="rounded-xl px-4 py-3 flex items-start gap-3"
              style={{ backgroundColor: "var(--accent)" }}
              role="region"
              aria-label="포인트 안내"
            >
              <Gift className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "var(--primary)" }} aria-hidden="true" />
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--accent-foreground)" }}>
                  1000p를 모으면 기프티슈를 드립니다!
                </p>
                <p className="text-xs" style={{ color: "var(--accent-foreground)" }}>
                  답글 10p / 채택 50p / TIP 100p
                </p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
