# syntax=docker/dockerfile:1

############################
# 1) base
############################
FROM node:22-alpine AS base
WORKDIR /app
ENV NODE_ENV=production
# Next 이미지 최적화/네이티브 모듈 호환을 위한 권장 패키지
RUN apk add --no-cache libc6-compat
# pnpm 사용
RUN corepack enable && corepack prepare pnpm@latest --activate

############################
# 2) deps: 의존성 설치 (캐시 레이어)
############################
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
# 개발용 prepare/postinstall(= lefthook 등) 스킵
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --ignore-scripts

# (선택) 네이티브 모듈이 있고 Alpine 프리빌트가 없으면 아래 주석 해제
# RUN apk add --no-cache --virtual .build-deps python3 make g++ \
#   && pnpm rebuild \
#   && apk del .build-deps

############################
# 3) builder: 소스 복사 + 빌드
############################
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# (선택) 빌드에 필요한 바이너리만 선별 재빌드
#  - sharp / @tailwindcss/oxide 가 필요하면 해제
# RUN pnpm rebuild sharp @tailwindcss/oxide

RUN pnpm build

############################
# 4) runner: 경량 런타임
############################
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# 보안상 비루트 사용자
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# 정적/런타임 산출물만 복사(standalone)
COPY --chown=nextjs:nodejs --from=builder /app/public ./public
COPY --chown=nextjs:nodejs --from=builder /app/.next/standalone ./
COPY --chown=nextjs:nodejs --from=builder /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

# 간단 헬스체크 (busybox wget)
HEALTHCHECK --interval=10s --timeout=3s --retries=5 \
CMD wget -qO- http://127.0.0.1:3000/ >/dev/null 2>&1 || exit 1

# server.js 는 standalone 빌드에서 생성됨
CMD ["node", "server.js"]