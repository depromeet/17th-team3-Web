# README_deploy.md

## 개요

프론트엔드(Next.js) 애플리케이션을 **Docker 이미지**로 빌드하여 **Docker Hub**에 푸시하고,

**NCP VM** 서버에 **SSH + Docker Compose**로 배포하는 CI/CD 가이드입니다.

- CI: **GitHub Actions**
- Registry: **Docker Hub** (`docker.io`)
- CD: **NCP VM** (Ubuntu, Docker/Compose)
- 배포 파일: `deploy/compose.yaml`
- Dockerfile: 멀티-스테이지(install → build → run), Next.js **standalone** 모드

---

## TL;DR

- 브랜치 푸시하면 이미지가 빌드/태깅/푸시됩니다.
- `feat/*` 브랜치 → **DEV 자동 배포**
- `main` 브랜치 → **PROD 자동 배포**(필요시 환경 승인)
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
               └─ (deploy-dev) SSH → NCP VM → docker compose up -d web

main push ─────┤
               └─ (deploy-prod) SSH → NCP VM → docker compose up -d web

```

---

## GitHub Actions 설정

### Variables (Repository → Settings → Actions → Variables)

| 키           | 값(예시)                      | 설명                |
| ------------ | ----------------------------- | ------------------- |
| `REGISTRY`   | `docker.io`                   | 컨테이너 레지스트리 |
| `IMAGE_REPO` | `journey1019/depromeet-team3` | `<계정>/<레포>`     |

### Secrets (Repository → Settings → Actions → Secrets)

| 키                   | 값(예시)                                  | 설명                                       |
| -------------------- | ----------------------------------------- | ------------------------------------------ |
| `REGISTRY_USER`      | `journey1019`                             | Docker Hub 아이디                          |
| `REGISTRY_PASSWORD`  | `<Docker Hub PAT>`                        | Docker Hub Personal Access Token           |
| `DEV_HOST`           | `<DEV 서버 IP/호스트>`                    | 예: `203.0.113.10`                         |
| `DEV_USER`           | `ubuntu`                                  | DEV SSH 사용자                             |
| `DEV_SSH_KEY`        | `-----BEGIN OPENSSH PRIVATE KEY----- ...` | **배포 전용 개인키** 전체 내용             |
| `DEV_SSH_PASSPHRASE` | (선택)                                    | 개인키 패스프레이즈 사용 시                |
| `DEV_PROJECT_DIR`    | `/srv/momuzzi`                            | 서버에서 `deploy/compose.yaml`이 있는 경로 |
| `PROD_HOST`          | (선택)                                    | PROD 서버 IP/호스트                        |
| `PROD_USER`          | (선택)                                    | PROD SSH 사용자                            |
| `PROD_SSH_KEY`       | (선택)                                    | PROD 배포 키                               |
| `PROD_PROJECT_DIR`   | (선택)                                    | PROD 배포 경로                             |

> 보안 TIP: 서버 호스트키 지문을 DEV_SSH_FINGERPRINT로 저장하고, 워크플로에 fingerprint:를 추가하면 MITM 방어가 강화됩니다.

---

## 서버(1회) 준비

1. **Docker & Compose 설치 확인**

```bash
docker version
docker compose version

```

1. **배포 디렉토리 준비**

```bash
sudo mkdir -p /srv/momuzzi
sudo chown <ssh-user>:<ssh-user> /srv/momuzzi
# 예: ubuntu 사용자라면 ubuntu:ubuntu

```

1. **compose 파일 배치**

- 방법 A) 서버에 레포를 클론하여 `/srv/momuzzi/deploy/compose.yaml` 경로 유지
- 방법 B) `deploy/` 폴더만 서버로 복사

1. (권장) **ubuntu를 docker 그룹에 추가**

```bash
sudo usermod -aG docker ubuntu
# 재로그인 후 반영

```

1. **배포 키 등록**(백엔드/인프라 팀이 수행)

- 프론트가 제공한 `deploy_key.pub` **한 줄 전체**를 서버의 `~/.ssh/authorized_keys`에 추가

```bash
mkdir -p ~/.ssh && chmod 700 ~/.ssh
touch ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys
echo "<deploy_key.pub 한 줄>" >> ~/.ssh/authorized_keys

```

---

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

## Dockerfile(요약)

- `node:22-alpine` 기반 멀티 스테이지
- `corepack`으로 pnpm 고정 (`ARG PNPM_VERSION`)
- Next.js **standalone** 빌드 결과만 런타임 이미지에 포함
- `HEALTHCHECK` 포함, `node server.js`로 기동

---

## 개발자 플로우

### 1) 자동 배포

- **feat/** 브랜치에 push → DEV 자동 배포
- **main** 브랜치에 push → PROD 자동 배포

### 2) 수동 배포(서버에서)

```bash
export IMAGE=docker.io/journey1019/depromeet-team3:sha-<7자리>
cd /srv/momuzzi
IMAGE="$IMAGE" docker compose -f deploy/compose.yaml pull web
IMAGE="$IMAGE" docker compose -f deploy/compose.yaml up -d web

```

### 3) 롤백

- 원하는 과거 커밋의 `sha-<7>` 태그로 재기동

```bash
export IMAGE=docker.io/journey1019/depromeet-team3:sha-<이전7자리>
IMAGE="$IMAGE" docker compose -f deploy/compose.yaml up -d web

```

### 4) 헬스/로그

```bash
curl -I http://127.0.0.1:3000 | head -n1
docker logs -f web

```

---

## 로컬 스모크 테스트(옵션)

Apple Silicon(M1/M2)에서 amd64 이미지를 돌릴 때:

```bash
TAG=sha-xxxxxxx
IMG=docker.io/journey1019/depromeet-team3:$TAG
docker pull --platform=linux/amd64 "$IMG"
docker run --platform=linux/amd64 -d --rm --name web -p 3001:3000 "$IMG"
curl -I http://127.0.0.1:3001 | head -n1
docker stop web

```

---

## 레지스트리 전환(NCP 사설 레지스트리)

- `REGISTRY=registry.momuzzi.site`
- `IMAGE_REPO=<네임스페이스>/<레포>`
- 서버/Actions 모두 `docker login registry.momuzzi.site` 로 조정
- SSL/TLS 인증서(정상) 필요

---

## 멀티아키 빌드(선택)

GitHub Actions에서:

```yaml
- uses: docker/setup-qemu-action@v3
- uses: docker/build-push-action@v6
  with:
    platforms: linux/amd64,linux/arm64
    cache-from: type=gha
    cache-to: type=gha,mode=max
```

> 네이티브 모듈(sharp 등) 사용 시 Alpine에서 리빌드가 필요할 수 있음.

---

## 트러블슈팅(자주 만난 케이스)

- **no matching manifest for linux/arm64**

  → 로컬이 ARM인데 이미지가 amd64 전용. `--platform=linux/amd64`로 실행하거나 멀티아키로 빌드.

- **Bind for 0.0.0.0:3000 failed: port is already allocated**

  → 포트 충돌. 기존 컨테이너 종료 또는 `ports: "3001:3000"`로 변경.

- **Cannot connect to the Docker daemon**

  → Docker 데몬 미기동. Docker Desktop/서비스 재시작, `docker context use desktop-linux`.

- **can't connect without a private SSH key or password**

  → Actions의 `key:`(개인키) 누락. `DEV_SSH_KEY` Secrets 재확인.

- **Permission denied (publickey)** 또는 **Broken pipe**

  → 서버 `~/.ssh/authorized_keys`에 공개키 미등록 또는 권한(700/600) 문제.

- **IMAGE 변수 미설정으로 compose 실패**

  → 배포 시 `IMAGE='<레포:태그>' docker compose ...` 형태로 주입 필요(워크플로에서 처리).

---

## 부록: 팀 공유용 요약(한 줄)

> CI는 GitHub Actions, CD는 NCP VM(SSH+Docker Compose).
>
> 도커 이미지는 Docker Hub에 `latest/sha-<7>`로 푸시, 서버는 `deploy/compose.yaml`로 기동.
