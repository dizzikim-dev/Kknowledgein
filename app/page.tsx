"use client"

import type React from "react"

import { useState } from "react"

export default function LandingPage() {
  return (
    <div className="landing-page">
      <style jsx global>{`
        /* Added responsive typography with clamp() and Korean text handling */
        :root {
          --h1: clamp(28px, 8vw, 56px);
          --h2: clamp(22px, 5.6vw, 36px);
          --body-lg: clamp(16px, 4.4vw, 20px);
          --body: 16px;
          --lh-tight: 1.15;
          --lh-normal: 1.5;
        }

        /* Korean text breaking rules */
        .kor {
          word-break: keep-all;
          line-break: anywhere;
          text-wrap: pretty;
        }

        .eng {
          overflow-wrap: anywhere;
          hyphens: auto;
        }

        /* Emoji baseline alignment */
        .emj {
          font-size: 1.1em;
          line-height: 1;
          vertical-align: -0.1em;
          display: inline-block;
        }

        .landing-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Pretendard', sans-serif;
          overflow-x: hidden;
          background: #000;
          color: #fff;
        }

        .hero {
          min-height: 100vh;
          background: linear-gradient(135deg, #00a154 0%, #03C75A 60%, #02B253 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 50%, rgba(3, 199, 90, 0.18) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(2, 178, 83, 0.15) 0%, transparent 50%);
        }

        .circuit-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0.1;
          background-image: 
            linear-gradient(90deg, rgba(3, 199, 90, 0.3) 1px, transparent 1px),
            linear-gradient(rgba(3, 199, 90, 0.3) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: circuitMove 30s linear infinite;
        }

        @keyframes circuitMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        .hero-content {
          text-align: center;
          z-index: 2;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 2rem;
          opacity: 0.95;
          animation: fadeIn 1s ease;
        }

        .logo img {
          height: 38px;
          width: auto;
        }

        .logo .emj {
          margin-left: 6px;
        }

        @media (max-width: 768px) {
          .logo img {
            height: 28px;
          }
        }

        /* Applied responsive h1 with text-wrap balance */
        h1 {
          font-size: var(--h1);
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(to right, #fff, #E9FBF0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fadeInUp 1s ease 0.2s both;
          line-height: var(--lh-tight);
          text-wrap: balance;
        }

        /* Applied responsive subtitle with max-width for readability */
        .subtitle {
          font-size: var(--body-lg);
          margin-bottom: 3rem;
          opacity: 0.95;
          line-height: var(--lh-normal);
          animation: fadeInUp 1s ease 0.4s both;
          color: #f0f0f0;
          max-width: 40ch;
          margin-left: auto;
          margin-right: auto;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 1s ease 0.6s both;
        }

        /* Added nowrap, min-height for tap targets, mobile stacking */
        .cta-button {
          display: inline-block;
          padding: 14px 20px;
          background: linear-gradient(135deg, #03C75A, #02B253);
          color: #fff;
          font-size: 1.2rem;
          font-weight: 700;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 10px 40px rgba(3, 199, 90, 0.35);
          cursor: pointer;
          border: none;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
          min-height: 56px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 50px rgba(3, 199, 90, 0.5);
        }

        .cta-button-white {
          background: #fff;
          color: #02B253;
          box-shadow: 0 10px 40px rgba(255, 255, 255, 0.2);
        }

        .cta-button-white:hover {
          background: #f0f0f0;
          box-shadow: 0 15px 50px rgba(255, 255, 255, 0.3);
        }

        /* Fixed scroll indicator with safe-area-inset-bottom */
        .scroll-indicator {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: calc(12px + env(safe-area-inset-bottom));
          opacity: 0.5;
          animation: floatY 2.2s ease-in-out infinite;
          font-size: 2rem;
        }

        @keyframes floatY {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -6px); }
        }

        /* Reduced section padding on mobile */
        .problem-section {
          padding: 64px 16px;
        }

        @media (max-width: 480px) {
          .problem-section {
            padding: 44px 16px;
          }
        }

        /* Applied responsive section-title with text-wrap balance */
        .section-title {
          text-align: center;
          font-size: var(--h2);
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(to right, #03C75A, #02B253);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
          text-wrap: balance;
        }

        .section-subtitle {
          text-align: center;
          font-size: 1.2rem;
          color: #888;
          margin-bottom: 4rem;
        }

        /* Centered text content with max-width constraint */
        .problem-highlight {
          max-width: 1100px;
          margin: 0 auto 4rem;
          padding: 4rem 3rem;
          background: linear-gradient(135deg, rgba(255, 107, 107, 0.05) 0%, rgba(255, 107, 107, 0.1) 100%);
          border-radius: 24px;
          border: 2px solid rgba(255, 107, 107, 0.3);
          box-shadow: 0 10px 40px rgba(255, 107, 107, 0.2);
        }

        .problem-highlight-title {
          font-size: 2rem;
          font-weight: 800;
          color: #ff6b6b;
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          text-wrap: balance;
          text-align: center;
        }

        .problem-highlight-content {
          font-size: 1.3rem;
          color: #e0e0e0;
          line-height: 2;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }

        @media (max-width: 480px) {
          .problem-highlight-content {
            max-width: 38ch;
          }
        }

        .problem-highlight-content p {
          margin-bottom: 1.2rem;
        }

        .problem-highlight-content strong {
          color: #fff;
        }

        .problem-highlight-content .emphasis {
          color: #ff6b6b;
          font-weight: 700;
        }

        .problem-highlight-footer {
          font-size: 1.4rem;
          font-weight: 700;
          color: #ff6b6b;
          margin-top: 2rem;
        }

        .problems-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        /* Reduced mobile shadows for better contrast */
        .problem-card {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          padding: 3rem;
          border-radius: 20px;
          border: 1px solid rgba(3, 199, 90, 0.28);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        @media (max-width: 480px) {
          .problem-card {
            box-shadow: 0 6px 20px rgba(3, 199, 90, 0.18);
            border-color: rgba(3, 199, 90, 0.35);
          }
        }

        .problem-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #03C75A, #02B253);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .problem-card:hover::before {
          transform: scaleX(1);
        }

        .problem-card:hover {
          transform: translateY(-10px);
          border-color: rgba(3, 199, 90, 0.45);
          box-shadow: 0 20px 60px rgba(3, 199, 90, 0.3);
        }

        .problem-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }

        .problem-title {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #fff;
          text-wrap: balance;
        }

        .problem-desc {
          color: #b8b8b8;
          line-height: 1.7;
          font-size: 1.05rem;
        }

        /* Reduced section padding on mobile */
        .features-section {
          padding: 64px 16px;
          background: linear-gradient(180deg, #0a0a0a 0%, #0f0f1e 100%);
        }

        @media (max-width: 480px) {
          .features-section {
            padding: 44px 16px;
          }
        }

        .features-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem; /* Reduced from 3rem to 2rem */
        }

        @media (max-width: 480px) {
          .features-grid {
            gap: 16px;
          }
        }

        /* Reduced mobile shadows */
        .feature-card {
          background: rgba(26, 26, 46, 0.6);
          backdrop-filter: blur(10px);
          padding: 2rem; /* Reduced from 3rem to 2rem */
          border-radius: 24px;
          border: 1px solid rgba(3, 199, 90, 0.28);
          transition: all 0.4s ease;
          position: relative;
          text-align: center;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #03C75A, #02B253);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .feature-card:hover::before {
          transform: scaleX(1);
        }

        .feature-card:hover {
          transform: translateY(-10px);
          border-color: rgba(3, 199, 90, 0.45);
          box-shadow: 0 20px 60px rgba(3, 199, 90, 0.3);
        }

        .feature-icon {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
        }

        .feature-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #fff;
          text-wrap: balance;
        }

        /* Moved carousel before description */
        .feature-carousel {
          position: relative;
          width: 100%;
          margin: 2rem 0;
          order: 2;
        }

        .feature-desc {
          color: #b8b8b8;
          line-height: 1.7;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          order: 3;
        }

        .feature-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1.5rem;
          order: 4;
          justify-content: center;
        }

        /* Added pill-shaped tag styling to match reference image */
        .feature-tech .tag {
          padding: 0.6rem 1.2rem;
          background: rgba(26, 26, 46, 0.8);
          color: #03C75A;
          border: 1.5px solid #03C75A;
          border-radius: 9999px;
          font-size: 0.95rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .feature-tech .tag:hover {
          background: rgba(3, 199, 90, 0.1);
          border-color: #02B253;
          transform: translateY(-2px);
        }

        /* Reduced section padding on mobile */
        .differentiation-section {
          padding: 64px 16px;
          background: #0a0a0a;
        }

        @media (max-width: 480px) {
          .differentiation-section {
            padding: 44px 16px;
          }
        }

        .diff-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          gap: 3rem;
        }

        @media (max-width: 480px) {
          .diff-grid {
            gap: 16px;
          }
        }

        .diff-card {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          padding: 3rem;
          border-radius: 24px;
          border-left: 5px solid;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        .diff-card:hover {
          transform: translateX(10px);
          box-shadow: -10px 0 40px rgba(3, 199, 90, 0.3);
        }

        .diff-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #fff;
          text-wrap: balance;
        }

        .diff-desc {
          color: #b8b8b8;
          line-height: 1.7;
          font-size: 1.1rem;
        }

        /* Reduced section padding on mobile */
        .tech-stack-section {
          padding: 64px 16px;
          background: linear-gradient(180deg, #0f0f1e 0%, #0a0a0a 100%);
        }

        @media (max-width: 480px) {
          .tech-stack-section {
            padding: 44px 16px;
          }
        }

        .tech-categories {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .tech-category {
          background: rgba(26, 26, 46, 0.4);
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid rgba(3, 199, 90, 0.2);
        }

        .tech-category-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #03C75A;
        }

        .tech-list {
          list-style: none;
        }

        .tech-list li {
          padding: 0.7rem 0;
          color: #c0c0c0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          font-size: 1rem;
        }

        .tech-list li:last-child {
          border-bottom: none;
        }

        .cta-section {
          padding: 8rem 2rem;
          background: linear-gradient(135deg, #03C75A 0%, #02B253 100%);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .cta-content {
          position: relative;
          z-index: 2;
        }

        .cta-section h2 {
          font-size: clamp(2.5rem, 6vw, 4rem);
          margin-bottom: 1.5rem;
          font-weight: 800;
          text-wrap: balance;
        }

        .cta-section p {
          font-size: 1.4rem;
          margin-bottom: 3rem;
          opacity: 0.95;
        }

        @media (max-width: 768px) {
          .features-grid,
          .problems-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Stack CTA buttons vertically on small screens */
        @media (max-width: 390px) {
          .cta-buttons {
            flex-direction: column;
            gap: 12px;
          }
          
          .cta-button {
            width: 100%;
          }
        }

        /* Fixed carousel to display portrait images properly */
        .carousel-container {
          position: relative;
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          aspect-ratio: 9 / 16;
          border-radius: 12px;
          overflow: hidden;
          background: #1a1a2e;
        }

        .carousel-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-slide.active {
          opacity: 1;
          pointer-events: auto;
        }

        .carousel-slide img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 12px;
        }

        .carousel-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(3, 199, 90, 0.9);
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
          opacity: 0.9;
        }

        .carousel-button:hover {
          background: rgba(3, 199, 90, 1);
          transform: translateY(-50%) scale(1.1);
        }

        .carousel-button.prev {
          left: 10px;
        }

        .carousel-button.next {
          right: 10px;
        }

        .carousel-indicators {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 10;
        }

        .carousel-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .carousel-indicator.active {
          background: #03C75A;
          width: 24px;
          border-radius: 5px;
        }
      `}</style>

      <section className="hero">
        <div className="circuit-bg"></div>
        <div className="hero-content">
          <div className="logo">
            <img src="/kt-wordmark.png" alt="KT" />
            <span>지식in</span>
            <span className="emj">🎓</span>
          </div>
          <h1>
            모든 질문과 지식을
            <br />
            한곳에서
          </h1>
          <p className="subtitle kor">
            KT 지식in은 사내 지식과 노하우를 연결하고, AI를 통해 빠르게 연결하는 지식 순환 플랫폼
          </p>
          <div className="cta-buttons">
            <a href="/questions" className="cta-button cta-button-white">
              질문 게시판 입장
            </a>
            <a href="/tips" className="cta-button cta-button-white">
              Tip 게시판 입장
            </a>
          </div>
          <div className="scroll-indicator">▼</div>
        </div>
      </section>

      <section className="problem-section">
        <div className="problem-highlight">
          <div className="problem-highlight-title">
            <span className="emj" style={{ fontSize: "3rem" }}>
              🚨
            </span>
            <div>
              지금의 소통 구조,
              <br />
              정말 잘 작동하고 있습니까?
            </div>
          </div>
          <div className="problem-highlight-content kor">
            <p>
              <strong style={{ fontSize: "1.5rem" }}>KT 임직원 12,000명.</strong>
              <br />
              <strong className="emphasis">'우문현답' 게시판에 올라오는 질문은 하루 평균 0.5건.</strong>
            </p>
            <p>
              <strong>'궁금한 건 많다'</strong>지만,
              <br />
              정작 소통의 창구는 닫혀 있습니다.
            </p>
            <p className="problem-highlight-footer">
              KT의 경험이, 지식이,
              <br />
              매일 사라지고 있습니다.
            </p>
          </div>
        </div>
        <h2 className="section-title">왜 필요한가?</h2>
        <p className="section-subtitle">조직 내 지식 관리의 3가지 핵심 문제</p>
        <div className="problems-grid">
          <div className="problem-card">
            <div className="problem-icon emj">🔒</div>
            <h3 className="problem-title">지식의 사일로(Silo)화</h3>
            <p className="problem-desc kor">노하우가 다른 조직으로 확산되지 못하고, 그대로 방치되고 있습니다.</p>
          </div>
          <div className="problem-card">
            <div className="problem-icon emj">🔄</div>
            <h3 className="problem-title">반복되는 문제 발생</h3>
            <p className="problem-desc kor">어제 내가 해결한 문제를 위해, 오늘도 누군가의 하루가 낭비되고 있습니다.</p>
          </div>
          <div className="problem-card">
            <div className="problem-icon emj">📈</div>
            <h3 className="problem-title">온보딩의 비효율</h3>
            <p className="problem-desc kor">새로운 직원이 KT에 적응하기까지 공백 3개월이 발생합니다.</p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">핵심 기능</h2>
        <p className="section-subtitle">AI 기반 지능형 지식 관리 시스템</p>
        <div className="features-grid">
          <FeatureCardWithCarousel
            icon="🔎"
            title={
              <>
                안전하게 묻고,
                <br />
                바로 답을 얻다
              </>
            }
            description="질문 게시판은 AI Content Moderator를 통해 욕설/비난/대외비 내용을 검출하여 보다 안전한 운영을 가능하게 합니다. 또한, 조직 그래프DB 및 인사이트 루프로 학습된 Agent를 통해 담당부서 맵핑 및 답변을 달아줍니다."
            tags={["Content Moderation", "AI Agent"]}
            slides={["/QB1_1.png", "/QB2_1.png", "/QB3_1.png"]}
          />
          <FeatureCardWithCarousel
            icon="🧐"
            title={
              <>
                나의 업무TIP을
                <br />
                회사 자산으로
              </>
            }
            description="TIP 게시판에서는 개인의 업무 프로세스, 프로젝트를 통한 Lesson Learn 등 다양한 업무 속 인사이트를 공유합니다. TIP 작성 및 우수 TIP 선정 시 포인트 적립 및 기프티슈 제공을 통해 이용자들의 참여를 독려합니다."
            tags={["지식 공유", "보상"]}
            slides={["/TB1.png", "/TB2.png"]}
          />
          <FeatureCardWithCarousel
            icon="♻️"
            title={
              <>
                Insight Loop
                <br />
                게시글↔AI 학습 체계
              </>
            }
            description="글의 내용을 Multi-label 텍스트 분류 모델로 분석해 Semantic Tagging을 자동 생성합니다. 생성된 태그는 질문·TIP 텍스트 DB의 메타데이터로 활용되어, RAG 파이프라인 내 답변 유사도와 정확도를 향상시키는 'Insight Loop' 시스템을 구성합니다."
            tags={["Multi-label Classification", "RAG Pipeline"]}
            slides={["/AI1.png", "/AI2.png"]}
          />
        </div>
      </section>

      <section className="differentiation-section">
        <h2 className="section-title">KT 지식in의 차별화</h2>
        <p className="section-subtitle kor">사내 지식이 선순환하며 스스로 성장하고 확장하는 지식 생태계 플랫폼</p>
        <div className="diff-grid">
          <div className="diff-card">
            <h3 className="diff-title">AI-Driven Automation</h3>
            <p className="diff-desc kor">
              OpenAI LLM 기반 자동 분류와 답변 최적화 기능으로, 지식이 빠르고 정확하게 연결
            </p>
          </div>
          <div className="diff-card">
            <h3 className="diff-title">Active Engagement Framework</h3>
            <p className="diff-desc kor">
              임직원이 능동적으로 참여할 수 있도록, 보상 체계와 지식 레벨 기반의 게이미피케이션 시스템을 운영
            </p>
          </div>
          <div className="diff-card">
            <h3 className="diff-title">Responsible Data Integrity</h3>
            <p className="diff-desc kor">
              3단계 검증 파이프라인을 적용하여 데이터의 건전성과 신뢰성을 확보하여 지식의 품질이 지속적으로 고도화되도록
              설계
            </p>
          </div>
        </div>
      </section>

      <section className="tech-stack-section">
        <h2 className="section-title">기술 스택</h2>
        <p className="section-subtitle">Azure + AoAI 기반 아키텍처</p>
        <div className="tech-categories">
          <div className="tech-category">
            <h4 className="tech-category-title">Infrastructure</h4>
            <ul className="tech-list">
              <li>Docker</li>
              <li>Azure ACR</li>
              <li>Azure App Service</li>
            </ul>
          </div>
          <div className="tech-category">
            <h4 className="tech-category-title">Service</h4>
            <ul className="tech-list">
              <li>Frontend: React / Vue.js</li>
              <li>Backend: FastAPI / Flask + LangChain</li>
            </ul>
          </div>
          <div className="tech-category">
            <h4 className="tech-category-title">Data</h4>
            <ul className="tech-list">
              <li>PostgreSQL</li>
              <li>Azure Vector DB</li>
              <li>Azure Blob Storage</li>
            </ul>
          </div>
          <div className="tech-category">
            <h4 className="tech-category-title">AI/ML</h4>
            <ul className="tech-list">
              <li>Azure OpenAI</li>
              <li>Langchain</li>
              <li>Hugging Face</li>
            </ul>
          </div>
          <div className="tech-category">
            <h4 className="tech-category-title">Security</h4>
            <ul className="tech-list">
              <li>Azure AD (SSO)</li>
              <li>AES-256 Encryption</li>
              <li>JWT Token</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>지금 바로 시작하세요</h2>
          <p>조직의 지식 자산을 극대화할 시간입니다</p>
          <div className="cta-buttons">
            <a href="/questions" className="cta-button cta-button-white">
              질문 게시판 입장
            </a>
            <a href="/tips" className="cta-button cta-button-white">
              Tip 게시판 입장
            </a>
          </div>
        </div>
      </section>

      <script
        dangerouslySetInnerHTML={{
          __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const observerOptions = {
              threshold: 0.1,
              rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  entry.target.style.opacity = '0';
                  entry.target.style.transform = 'translateY(30px)';
                  
                  setTimeout(() => {
                    entry.target.style.transition = 'all 0.8s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                  }, 100);
                }
              });
            }, observerOptions);

            document.querySelectorAll('.problem-card, .feature-card, .diff-card, .tech-category').forEach(card => {
              observer.observe(card);
            });
          });
        `,
        }}
      />
    </div>
  )
}

function FeatureCardWithCarousel({
  icon,
  title,
  description,
  tags,
  slides,
}: {
  icon: string
  title: React.ReactNode
  description: string
  tags: string[]
  slides: string[]
}) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="feature-card">
      <div className="feature-icon emj">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <div className="feature-carousel">
        <div className="carousel-container">
          {slides.map((slide, index) => (
            <div key={index} className={`carousel-slide ${index === currentSlide ? "active" : ""}`}>
              <img src={slide || "/placeholder.svg"} alt={`slide-${index}`} />
            </div>
          ))}
          <button className="carousel-button prev" onClick={prevSlide} aria-label="이전 슬라이드">
            ‹
          </button>
          <button className="carousel-button next" onClick={nextSlide} aria-label="다음 슬라이드">
            ›
          </button>
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`carousel-indicator ${index === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`슬라이드 ${index + 1}로 이동`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <p className="feature-desc kor">{description}</p>
      <div className="feature-tech">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
