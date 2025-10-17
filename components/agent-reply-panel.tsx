"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, ExternalLink } from "lucide-react"
import type { AgentReply } from "@/lib/mock-data"

interface AgentReplyPanelProps {
  reply: AgentReply
}

export function AgentReplyPanel({ reply }: AgentReplyPanelProps) {
  return (
    <Card className="p-4 border-2" style={{ backgroundColor: "var(--accent)", borderColor: "var(--primary)" }}>
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-1">
          <Bot className="h-5 w-5" style={{ color: "var(--primary)" }} aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base mb-2">자동 응답(에이전트)</h3>
          <p className="text-sm leading-relaxed mb-3">{reply.text}</p>

          {reply.tipLinks && reply.tipLinks.length > 0 && (
            <div className="mb-3">
              <p className="text-sm font-medium mb-2">참조 TIP:</p>
              <div className="flex flex-col gap-2">
                {reply.tipLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={`/tips/${link.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                    style={{ color: "var(--link)" }}
                    aria-label={`TIP 보기: ${link.title}`}
                  >
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {reply.graphProof && (
            <div>
              <p className="text-sm font-medium mb-2">담당자 찾기 경로:</p>
              <GraphVisualization proof={reply.graphProof} />
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

function GraphVisualization({ proof }: { proof: NonNullable<AgentReply["graphProof"]> }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex flex-wrap items-center gap-2">
        {proof.nodes.map((node, idx) => (
          <div key={node.id} className="flex items-center gap-2">
            <Badge
              variant={node.type === "Topic" ? "default" : node.type === "Dept" ? "secondary" : "outline"}
              className="text-xs"
              style={
                node.type === "Topic"
                  ? { backgroundColor: "var(--primary)", color: "white" }
                  : node.type === "Dept"
                    ? { backgroundColor: "var(--accent)", color: "var(--accent-foreground)" }
                    : {}
              }
            >
              {node.label}
              <span className="ml-1 text-[10px] opacity-70">({node.type})</span>
            </Badge>
            {idx < proof.nodes.length - 1 && <span className="text-muted-foreground">→</span>}
          </div>
        ))}
      </div>
      {proof.edges.length > 0 && (
        <div className="mt-2 text-xs text-muted-foreground">
          {proof.edges.map((edge, idx) => (
            <div key={idx}>
              {edge.label && `${edge.label}: `}
              {proof.nodes.find((n) => n.id === edge.from)?.label} → {proof.nodes.find((n) => n.id === edge.to)?.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
