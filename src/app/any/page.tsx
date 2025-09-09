/** src/app/any/page.tsx */

import Image from 'next/image';
import Link from 'next/link';

const AnyPage = () => {
  return (
    // 페이지 단일 스크롤: 화면 높이 폴백 유틸 사용
    <main className="min-h-screen-safe bg-gradient-to-b from-white to-neutral-50 text-neutral-900">
      {/* Sticky 헤더: 주소창 변화(dvh) 상황에서도 안정 */}
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="safe-padding mx-auto flex w-full max-w-[375px] items-center justify-between px-4 py-3 sm:max-w-[480px] md:max-w-[640px]">
          <span className="text-sm font-semibold">/any · 테스트 페이지</span>
          <nav className="flex items-center gap-3">
            <Link href="/" className="text-xs text-blue-600 hover:underline">
              Home
            </Link>
            <a href="#cards" className="hidden text-xs text-neutral-600 hover:underline sm:inline">
              Cards
            </a>
            <a href="#form" className="hidden text-xs text-neutral-600 hover:underline sm:inline">
              Form
            </a>
          </nav>
        </div>
      </header>

      {/* 컨텐츠 래퍼: ScaledStage(production)와 동일한 max-width 센터링 */}
      <div className="mx-auto w-full max-w-[375px] px-4 py-6 sm:max-w-[480px] md:max-w-[640px]">
        {/* Hero / 안내 배너 */}
        <section className="mb-6 rounded-2xl border bg-white p-4 shadow-sm">
          <h1 className="text-lg font-bold">프로덕션 레이아웃 검증</h1>
          <p className="mt-1 text-sm text-neutral-600">
            이 페이지는 <span className="font-medium">단일 문서 스크롤</span>을 유지하면서 max-width
            max-width 센터링, dvh 폴백, 폰트 확대, 가로/세로 스크롤 제스처를 한 번에 테스트할 수
            테스트할 수 있게 구성되었습니다.
          </p>
          <ul className="mt-3 list-inside list-disc text-sm text-neutral-600">
            <li>모바일 주소창 등장/사라짐(dvh) 시 레이아웃 점프 확인</li>
            <li>폰트 크기 확대(접근성) 시 텍스트/레이아웃 반응 확인</li>
            <li>중첩 스크롤 없음(내부 overflow 미사용)</li>
          </ul>
        </section>

        {/* 버튼/상태 테스트 */}
        <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <button className="rounded-xl border bg-white px-3 py-2 text-sm font-medium shadow-sm transition hover:bg-neutral-50 active:scale-[0.99]">
            기본 버튼
          </button>
          <button className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]">
            프라이머리
          </button>
          <button
            className="rounded-xl border bg-white px-3 py-2 text-sm text-neutral-500 shadow-sm"
            disabled
          >
            비활성화
          </button>
        </section>

        {/* 카드 그리드(반응형 너비 변화 확인) */}
        <section id="cards" className="mb-8 space-y-4">
          <h2 className="text-base font-semibold">카드 레이아웃</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <article key={i} className="rounded-2xl border bg-white p-4 shadow-sm">
                <h3 className="font-medium">카드 {i}</h3>
                <p className="mt-1 text-sm text-neutral-600">
                  반응형에서 가로폭이 늘어나면 카드가 2열로 배치됩니다.
                </p>
                <div className="mt-3 overflow-hidden rounded-xl">
                  <Image
                    src={`/images/backgroundImage.png`}
                    alt=""
                    width={800}
                    height={480}
                    className="h-32 w-full object-cover"
                    priority={i === 1}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 가로 스크롤(제스처 테스트용) */}
        <section className="mb-8">
          <h2 className="mb-3 text-base font-semibold">가로 스크롤 리스트</h2>
          <div className="-mx-4 overflow-x-auto px-4">
            <div className="flex gap-3">
              {Array.from({ length: 12 }).map((_, idx) => (
                <div key={idx} className="min-w-[160px] rounded-2xl border bg-white p-4 shadow-sm">
                  <p className="text-sm font-medium">Item {idx + 1}</p>
                  <p className="mt-1 text-xs text-neutral-600">가로 스와이프 제스처 확인</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 폼 & 포커스/접근성 확인 */}
        <section id="form" className="mb-10 rounded-2xl border bg-white p-4 shadow-sm">
          <h2 className="text-base font-semibold">폼 필드</h2>
          <form className="mt-3 space-y-4">
            <label className="block">
              <span className="text-sm font-medium">이메일</span>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full rounded-xl border px-3 py-2 text-sm ring-blue-500 outline-none focus:ring-2"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">메시지</span>
              <textarea
                rows={4}
                placeholder="내용을 입력하세요"
                className="mt-1 w-full rounded-xl border px-3 py-2 text-sm ring-blue-500 outline-none focus:ring-2"
              />
            </label>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="size-4 accent-blue-600" />
                이용 약관에 동의합니다
              </label>
              <button
                type="submit"
                className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
              >
                제출
              </button>
            </div>
          </form>
        </section>

        {/* 긴 내용(세로 스크롤 테스트) */}
        <section className="prose prose-neutral max-w-none rounded-2xl border bg-white p-4 shadow-sm">
          <h2>긴 문서 섹션</h2>
          <p>
            dvh/svh 폴백과 문서 단일 스크롤이 잘 동작하는지 확인을 위해 긴 내용을 넣었습니다.
            모바일에서 주소창이 나타나고 사라질 때 상하 점프가 최소화되는지 관찰하세요.
          </p>
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, aliquam amet
              aspernatur atque autem commodi cumque delectus distinctio doloribus esse ex explicabo
              harum hic illum iste magni nostrum odit officiis perspiciatis quae quis quod ratione
              recusandae reiciendis repellat repudiandae rerum sapiente sed sit tempora vel
              veritatis vero voluptates.
            </p>
          ))}
        </section>

        {/* Footer spacer */}
        <div className="h-16" />
      </div>

      {/* 고정 푸터(안전영역 패딩 적용 예시) */}
      <footer className="safe-padding fixed inset-x-0 bottom-0 z-10 border-t bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[375px] items-center justify-between px-4 py-3 text-xs text-neutral-600 sm:max-w-[480px] md:max-w-[640px]">
          <span>© 2025 Demo</span>
          <span>Single-scroll · max-width</span>
        </div>
      </footer>
    </main>
  );
};

export default AnyPage;
