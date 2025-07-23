# ---- Frontend Build Stage ----
FROM node:18-alpine AS frontend-builder

WORKDIR /app
COPY frontend/ ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile
RUN pnpm build

# ---- Backend Build Stage ----
FROM python:3.10-slim AS backend-builder

WORKDIR /app
COPY backend/ ./

RUN apt-get update && apt-get install -y ffmpeg git && rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir -r requirements.txt

# ---- Final Runtime Image ----
FROM python:3.10-slim

# System tools
RUN apt-get update && apt-get install -y ffmpeg supervisor curl && rm -rf /var/lib/apt/lists/*

# Create app user
RUN useradd -m appuser
USER appuser
WORKDIR /home/appuser

# Copy frontend
COPY --from=frontend-builder /app/.next .next/
COPY --from=frontend-builder /app/public ./public/
COPY --from=frontend-builder /app/package.json ./
COPY --from=frontend-builder /app/next.config.mjs ./

# Copy backend
COPY --from=backend-builder /app ./backend/

# Copy supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Install backend deps
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

ENV PATH="/home/appuser/.local/bin:$PATH" \
    PYTHONUNBUFFERED=1 \
    IN_DOCKER=true

EXPOSE 8000 3000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
