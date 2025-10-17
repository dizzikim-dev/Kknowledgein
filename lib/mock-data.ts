export type Post = {
  id: string
  board: "question" | "tip"
  indexNo: number
  title: string
  content: string
  authorNameMasked: string
  authorDept: string
  createdAt: string
  views: number
  likes: number
  dislikes: number
  tags?: string[]
  bestTip?: boolean
  agentReply?: AgentReply
  comments: Comment[]
}

export type Comment = {
  id: string
  authorNameMasked: string
  authorDept: string
  content: string
  createdAt: string
  likes: number
}

export type AgentReply = {
  replyType: "tip_citation" | "dept_graph"
  text: string
  tipLinks?: { id: string; title: string }[]
  graphProof?: GraphProof
}

export type GraphProof = {
  nodes: { id: string; label: string; type: "Topic" | "Dept" | "Person" }[]
  edges: { from: string; to: string; label?: string }[]
}

export type User = {
  id: string
  name: string
  deptTeamName: string
  points: number
}

export const mockUsers: User[] = [
  { id: "u1001", name: "김땡땡", deptTeamName: "VIBLUE 팀", points: 780 },
  { id: "u1002", name: "박민서", deptTeamName: "네트워크운영팀", points: 1220 },
]

export const mockPosts: Post[] = [
  {
    id: "q001",
    board: "question",
    indexNo: 1012,
    title: "나라장터 제안서 템플릿 어디서 받을 수 있을까요?",
    content:
      "신규 제안 진행 중인데 **나라장터** 제출용 최신 템플릿 경로를 모르겠습니다. 내부 공유 위치나 담당 부서 알려주시면 감사하겠습니다.",
    authorNameMasked: "김*기",
    authorDept: "공공섹터영업팀",
    createdAt: "2025-10-07T10:12:00+09:00",
    views: 324,
    likes: 9,
    dislikes: 0,
    tags: ["나라장터", "제안서", "양식"],
    agentReply: {
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
    },
    comments: [
      {
        id: "c1",
        authorNameMasked: "이*주",
        authorDept: "공공사업제안팀",
        content: "K-Box > 공공사업 제안 > 2025 양식 폴더에 있습니다. 내부 경로는 보안상 DM으로 안내드릴게요.",
        createdAt: "2025-10-07T11:02:00+09:00",
        likes: 4,
      },
    ],
  },
  {
    id: "q002",
    board: "question",
    indexNo: 1013,
    title: "광케이블 절체 테스트 중 링 구성 알람 대응 문의",
    content: "인터링크 절체 테스트 중 링 알람이 지속 발생합니다. 1차 대응 절차와 담당 부서가 궁금합니다.",
    authorNameMasked: "정*우",
    authorDept: "인프라기술지원팀",
    createdAt: "2025-10-07T12:40:00+09:00",
    views: 198,
    likes: 3,
    dislikes: 1,
    tags: ["절체", "알람", "인터링크"],
    agentReply: {
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
    },
    comments: [],
  },
  {
    id: "q003",
    board: "question",
    indexNo: 1014,
    title: "출장비 결의를 어떻게 ㅠ",
    content: "출장을 별로 갈 일이 없는 부서라 출장비 어떻게 결의 올리는지 아는 사람이 없네요... 아시는 분..",
    authorNameMasked: "문*영",
    authorDept: "DX기획팀",
    createdAt: "2025-10-10T09:45:00+09:00",
    views: 156,
    likes: 5,
    dislikes: 0,
    tags: ["출장비", "결의"],
    agentReply: {
      replyType: "tip_citation",
      text: "다음 TIP 문서가 도움이 될 수 있어요. 또한 '공공제안 프로세스' 담당 부서 안내는 아래 그래프를 참고하세요.",
      tipLinks: [{ id: "t103", title: "출장비 결의 방법" }],
      graphProof: {
        nodes: [
          { id: "x1", label: "출장비 결의", type: "Topic" },
          { id: "x2", label: "경영지원팀", type: "Dept" },
          { id: "x3", label: "재무회계팀", type: "Dept" },
        ],
        edges: [
          { from: "x1", to: "x2", label: "1차 문의" },
          { from: "x2", to: "x3", label: "결의 검토" },
        ],
      },
    },
    comments: [
      {
        id: "cq1",
        authorNameMasked: "박*서",
        authorDept: "공공사업제안팀",
        content: "마비서 > 시외출장 경로로 들어가시면 돼요!",
        createdAt: "2025-10-10T10:00:00+09:00",
        likes: 2,
      },
      {
        id: "cq2",
        authorNameMasked: "정*우",
        authorDept: "인프라기술지원팀",
        content: "TIP 게시판 새 글 링크 참고해보세요(법카 사용/미사용 구분되어 있어요).",
        createdAt: "2025-10-10T10:05:00+09:00",
        likes: 3,
      },
      {
        id: "cq3",
        authorNameMasked: "이*나",
        authorDept: "인사기획팀",
        content: "출발/도착지 설정은 증빙 캡쳐 필수입니다.",
        createdAt: "2025-10-10T10:12:00+09:00",
        likes: 1,
      },
    ],
  },
  {
    id: "t101",
    board: "tip",
    indexNo: 506,
    title: "국가입찰(나라장터) 제안서 템플릿 모음 (2025년 2분기)",
    content:
      "최신 템플릿(표지, 목차, 보안 서약 포함) 정리 링크와 작성 시 유의사항을 요약했습니다.\n\n## 템플릿 구성\n\n1. **표지** - 공공기관별 양식\n2. **목차** - 표준 구성\n3. **보안 서약서** - 필수 첨부\n\n## 주의사항\n\n- 제출 전 반드시 최신 버전 확인\n- 보안등급 표시 필수\n- 담당자 검토 후 제출",
    authorNameMasked: "박*서",
    authorDept: "공공사업제안팀",
    createdAt: "2025-10-05T09:10:00+09:00",
    views: 1120,
    likes: 78,
    dislikes: 2,
    bestTip: true,
    tags: ["나라장터", "양식", "가이드"],
    comments: [],
  },
  {
    id: "t102",
    board: "tip",
    indexNo: 507,
    title: "인터링크 절체 테스트 체크리스트 (요약본)",
    content:
      "필수 점검 항목 8가지와 공통 이슈, 연락 체계를 정리했습니다.\n\n## 필수 점검 항목\n\n1. 링 구성 확인\n2. 알람 모니터링 설정\n3. 백업 경로 검증\n4. 트래픽 분산 확인\n5. 장애 복구 시간 측정\n6. 로그 수집 설정\n7. 담당자 연락망 확인\n8. 사후 보고서 작성\n\n## 공통 이슈\n\n- 알람 지연 발생 시 → 네트워크운영팀 즉시 연락\n- 트래픽 급증 시 → 전송운용파트 협업",
    authorNameMasked: "오*정",
    authorDept: "전송운용파트",
    createdAt: "2025-10-06T14:32:00+09:00",
    views: 680,
    likes: 45,
    dislikes: 0,
    bestTip: false,
    tags: ["절체", "체크리스트", "운용"],
    comments: [],
  },
  {
    id: "t103",
    board: "tip",
    indexNo: 508,
    title: "출장비 결의 방법",
    content:
      "출장을 맨날 갈 일이 없으면 결의할 때마다 헷갈리고, 그때마다 찾기 힘들어서 정리해서 올려놓습니다.\n\n**1인 1법인카드가 가능한 KT**에서는 **출장 중 법카 사용 여부**에 따라 **출장 후 결의 방법**이 달라집니다. 명심하세요!!\n\n### 출장 전\n1) 마비서 클릭\n2) 시외출장 클릭\n3) 출장 시작/종점 설정  \n- *중요한 이유*: 실제 이동 km(거마비) 산정 근거가 되므로 정확히!\n4) 코스트센터/계정 확인(타부서 명목 출장은 확인 필수)\n\n### 출장 후(법카 미사용)\n1) 마비서 클릭\n2) 출장비 정산 메뉴 선택\n3) 영수증 첨부 및 항목별 입력\n\n### 출장 후(법카 사용)\n1) 마비서 클릭\n2) 법인카드 사용 내역 확인\n3) 출장 연계 처리",
    authorNameMasked: "최*빈",
    authorDept: "경영지원팀",
    createdAt: "2025-10-10T09:30:00+09:00",
    views: 412,
    likes: 37,
    dislikes: 0,
    bestTip: false,
    tags: ["출장비", "결의"],
    comments: [
      {
        id: "ct1",
        authorNameMasked: "박*서",
        authorDept: "공공사업제안팀",
        content: "정리 최고… 매번 찾았는데 이제 여기로 오면 되겠네요!",
        createdAt: "2025-10-10T10:10:00+09:00",
        likes: 6,
      },
      {
        id: "ct2",
        authorNameMasked: "장*희",
        authorDept: "재무회계팀",
        content: "법카 사용 케이스 체크리스트 추가 부탁드려요 :)",
        createdAt: "2025-10-10T10:22:00+09:00",
        likes: 3,
      },
      {
        id: "ct3",
        authorNameMasked: "김*욱",
        authorDept: "네트워크운영팀",
        content: "거마비 산정 팁 도움됐습니다.",
        createdAt: "2025-10-10T11:00:00+09:00",
        likes: 2,
      },
      {
        id: "ct4",
        authorNameMasked: "이*나",
        authorDept: "인사기획팀",
        content: "출발/도착지 증빙 캡쳐 예시는 첨부 예정입니다.",
        createdAt: "2025-10-10T11:21:00+09:00",
        likes: 4,
      },
      {
        id: "ct5",
        authorNameMasked: "정*우",
        authorDept: "인프라기술지원팀",
        content: "북마크 완료!",
        createdAt: "2025-10-10T12:00:00+09:00",
        likes: 1,
      },
    ],
  },
]

// In-memory storage for runtime modifications
const posts = [...mockPosts]
const users = [...mockUsers]

export function getPosts(board?: "question" | "tip") {
  if (board) {
    return posts.filter((p) => p.board === board)
  }
  return posts
}

export function getPost(id: string) {
  return posts.find((p) => p.id === id)
}

export function addPost(post: Post) {
  posts.unshift(post)
  return post
}

export function updatePost(id: string, updates: Partial<Post>) {
  const index = posts.findIndex((p) => p.id === id)
  if (index !== -1) {
    posts[index] = { ...posts[index], ...updates }
    return posts[index]
  }
  return null
}

export function getCurrentUser() {
  return users[0] // Mock current user
}

export function updateUserPoints(userId: string, points: number) {
  const user = users.find((u) => u.id === userId)
  if (user) {
    user.points += points
  }
}

export function getBestTips() {
  return posts
    .filter((p) => p.board === "tip")
    .sort((a, b) => b.likes * 3 + b.views * 0.1 - (a.likes * 3 + a.views * 0.1))
    .slice(0, 3)
}
