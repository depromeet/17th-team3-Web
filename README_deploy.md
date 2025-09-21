# README_deploy.md

## 개요

프론트엔드(Next.js) 애플리케이션을 **Docker 이미지**로 빌드하여 **Docker Hub**에 푸시하고,

**NCP VM 내부의 Self-Hosted Runner**가 서버에서 직접 **Docker Compose**로 배포하는 CI/CD 가이드입니다.

- CI: **GitHub Actions**
- Registry: **Docker Hub** (`docker.io`)
- CD: **Self-Hosted Runner on NCP VM**
- 배포 파일: `deploy/compose.yaml`
- Dockerfile: 멀티-스테이지(install → build → run), Next.js **standalone** 모드

---

## TL;DR

- 브랜치 푸시하면 이미지가 빌드/태깅/푸시됩니다.
- `feat/*` → **DEV 자동 배포** (self-hosted runner)
- `main` → **PROD 자동 배포** (self-hosted runner)
- 롤백: 이전 커밋의 `sha-<7>` 태그로 `compose up -d` 재기동

---

## 레포 구조(배포 관련)

```
.
├─ .github/workflows/docker.yml     # 빌드/푸시 + DEV/PROD 배포 워크플로
├─ deploy/
│  └─ compose.yaml                  # 서버에서 실행할 Docker Compose 파일
├─ Dockerfile                       # Next.js 빌드/런타임 이미지
└─ README_deploy.md                 # ← 이 문서

```

---

## 파이프라인 개요

```
Dev/Feat push ─┐
               ├─ GitHub Actions (docker)
               │     ├─ docker build (Next.js standalone)
               │     ├─ docker push → Docker Hub
               │     └─ 태깅: sha-<7>, (main이면 latest도)
               └─ (deploy-dev) Self-Hosted Runner → docker compose up -d web

main push ─────┤
               └─ (deploy-prod) Self-Hosted Runner → docker compose up -d web

```

---

## GitHub Actions 설정

### Variables (Repository → Settings → Actions → Variables)

| 키           | 값(예시)                      | 설명                |
| ------------ | ----------------------------- | ------------------- |
| `REGISTRY`   | `docker.io`                   | 컨테이너 레지스트리 |
| `IMAGE_REPO` | `journey1019/depromeet-team3` | `<계정>/<레포>`     |

### Secrets (Repository → Settings → Actions → Secrets)

| 키                  | 값(예시)              | 설명                                       |
| ------------------- | --------------------- | ------------------------------------------ |
| `REGISTRY_USER`     | `journey1019`         | Docker Hub 아이디                          |
| `REGISTRY_PASSWORD` | `<Docker Hub PAT>`    | Docker Hub Personal Access Token           |
| `DEV_PROJECT_DIR`   | `/srv/momuzzi`        | 서버에서 `deploy/compose.yaml` 경로의 루트 |
| `PROD_PROJECT_DIR`  | (선택) `/srv/momuzzi` | PROD 배포 경로                             |

> **중요:** 기존 SSH 관련 Secrets(`DEV_HOST`, `DEV_SSH_KEY` 등)은 self-hosted 배포에 **필요하지 않습니다**.

---

## 서버(1회) 준비

1. **Docker & Compose 설치 확인**

```bash
docker version
docker compose version

```

2. **배포 디렉토리 준비**

```bash
sudo mkdir -p /srv/momuzzi
sudo chown ubuntu:ubuntu /srv/momuzzi

```

3. **compose 파일 배치**

서버에 레포를 클론하거나, 로컬에서 `deploy/compose.yaml`을 서버로 복사하여
`/srv/momuzzi/deploy/compose.yaml` 경로 유지

4. (권장) **ubuntu를 docker 그룹에 추가**

```bash
sudo usermod -aG docker ubuntu
# 재로그인 후 반영

```

5. **Self-Hosted Runner 설치 (레포 기준)**

```bash
mkdir -p ~/actions-runner && cd ~/actions-runner
curl -o actions-runner-linux-x64-2.320.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.320.0/actions-runner-linux-x64-2.320.0.tar.gz
tar xzf actions-runner-linux-x64-2.320.0.tar.gz

# 레포 Settings → Actions → Runners → New self-hosted runner 에서 토큰 발급
./config.sh --url https://github.com/<OWNER>/<REPO> --token <RUNNER_TOKEN>
sudo ./svc.sh install
sudo ./svc.sh start
```

- 러너 라벨: 기본(self-hosted, Linux, X64) 사용.
- GitHub → Settings → Actions → Runners에서 Online 상태 확인.

## compose 설정

`deploy/compose.yaml`(요약):

```yaml
services:
  web:
    image: ${IMAGE} # Actions에서 IMAGE='레포:태그'로 주입
    # platform: linux/amd64    # (옵션) macOS/ARM 로컬 테스트 시 유용
    ports:
      - '3000:3000' # dev 충돌 시 "3001:3000"
    environment:
      NODE_ENV: production
    restart: unless-stopped
    healthcheck:
      test: ['CMD-SHELL', 'wget -qO- http://127.0.0.1:3000/ >/dev/null 2>&1 || exit 1']
      interval: 10s
      timeout: 3s
      retries: 5
      start_period: 10s
```

> 서버에서 수동 테스트(예시):
>
> `IMAGE="docker.io/journey1019/depromeet-team3:sha-xxxxxxx" docker compose -f deploy/compose.yaml up -d`

---

## 개발자 플로우

### 1) 자동 배포

- feat/ 브랜치에 push → DEV 자동 배포 (self-hosted runner)
- main 브랜치에 push → PROD 자동 배포 (self-hosted runner)

### 2) 수동 배포 (서버에서)

```bash
export IMAGE=docker.io/journey1019/depromeet-team3:sha-<7자리>
cd /srv/momuzzi
IMAGE="$IMAGE" docker compose -f deploy/compose.yaml pull web
IMAGE="$IMAGE" docker compose -f deploy/compose.yaml up -d web

```

### 3) 롤백

```bash
export IMAGE=docker.io/journey1019/depromeet-team3:sha-<이전7자리>
IMAGE="$IMAGE" docker compose -f deploy/compose.yaml up -d web

```

### 4) 헬스/로그

```bash
curl -I http://127.0.0.1:3000 | head -n1
docker logs -f web

```

### 멀티아키 빌드 (선택)

```yaml
- uses: docker/setup-qemu-action@v3
- uses: docker/build-push-action@v6
  with:
    platforms: linux/amd64,linux/arm64
```

### 트러블슈팅

- Actions 배포 잡이 :sha-xxxx 형태의 이미지로 실패
  - docker.yml의 deploy-dev에서 IMAGE를 다음 패턴으로 직접 조립하는지 확인:

```
{REGISTRY}/{IMAGE_REPO}:sha-{SHORT_SHA}
```

- Cannot connect to Docker daemon
  - ubuntu가 docker 그룹에 포함되어 있는지 확인, 데몬 실행 상태 확인.
- 포트 충돌
  - compose의 ports를 "3001:3000" 등으로 변경.
- 외부 접속 불가
  - NCP 보안그룹/ufw에서 3000/tcp 허용 여부 확인.
