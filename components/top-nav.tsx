"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, PenSquare, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function TopNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/questions") return pathname.startsWith("/questions")
    if (path === "/tips") return pathname.startsWith("/tips")
    return pathname === path
  }

  const getWriteLink = () => {
    if (pathname.startsWith("/tips")) return "/tips/new"
    return "/questions/new"
  }

  const getWriteLabel = () => {
    if (pathname.startsWith("/tips")) return "글쓰기(TIP 작성)"
    return "글쓰기(질문하기)"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-[1200px] px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold" aria-label="KT 지식in 홈">
            <Image
              src="/images/design-mode/01_KT%20Wordmark%20%28Standard%29_01.png"
              alt="KT"
              width={80}
              height={28}
              className="h-7 w-auto dark:invert"
            />
            <span>지식in</span>
            <GraduationCap className="h-5 w-5" style={{ color: "var(--primary)" }} aria-hidden="true" />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/questions"
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors",
                isActive("/questions")
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--primary)]"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-label="질문 게시판"
            >
              질문
            </Link>
            <Link
              href="/tips"
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors",
                isActive("/tips")
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--primary)]"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-label="TIP 게시판"
            >
              TIP
            </Link>
            <Link
              href="/me"
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors",
                isActive("/me")
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--primary)]"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-label="내 정보"
            >
              내 정보
            </Link>
          </nav>

          <div className="flex items-center gap-2 flex-1 md:flex-initial justify-end">
            <div className="relative hidden sm:block w-full max-w-xs">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                type="search"
                placeholder="검색어를 입력하세요…"
                className="pl-9 h-9 focus-visible:ring-[var(--primary)]"
                aria-label="검색"
              />
            </div>
            <Button
              asChild
              size="sm"
              className="whitespace-nowrap"
              style={{ backgroundColor: "var(--primary)", color: "white" }}
            >
              <Link href={getWriteLink()} aria-label={getWriteLabel()}>
                <PenSquare className="h-4 w-4 mr-2" aria-hidden="true" />
                <span className="hidden sm:inline">{getWriteLabel()}</span>
                <span className="sm:hidden">글쓰기</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="flex md:hidden items-center gap-1 pb-3 overflow-x-auto">
          <Link
            href="/questions"
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap",
              isActive("/questions")
                ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--primary)]"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-label="질문 게시판"
          >
            질문
          </Link>
          <Link
            href="/tips"
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap",
              isActive("/tips")
                ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--primary)]"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-label="TIP 게시판"
          >
            TIP
          </Link>
          <Link
            href="/me"
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap",
              isActive("/me")
                ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--primary)]"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-label="내 정보"
          >
            내 정보
          </Link>
        </nav>
      </div>
    </header>
  )
}
