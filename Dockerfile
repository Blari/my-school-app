# Стадия для установки зависимостей frontend
FROM node:20.15.1-alpine AS frontend-deps
RUN apk add --no-cache git
WORKDIR /app/frontend
COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install --pure-lockfile

# Стадия для установки зависимостей backend
FROM node:20.15.1-alpine AS backend-deps
RUN apk add --no-cache git
WORKDIR /app/backend
COPY backend/package.json backend/yarn.lock ./
RUN yarn install --pure-lockfile

# Финальный образ
FROM node:20.15.1-alpine
RUN apk add --no-cache git
# Установка nodemon и concurrently глобально
RUN yarn global add nodemon concurrently

# Настройка рабочей директории для всего проекта
WORKDIR /app

# Копирование исходного кода frontend
COPY --from=frontend-deps /app/frontend /app/frontend

# Копирование исходного кода backend
COPY --from=backend-deps /app/backend /app/backend

# Копирование лишнего фронтендового кода в frontend директорию
COPY frontend /app/frontend

# Копирование лишнего бэкендового кода в backend директорию
COPY backend /app/backend

# Команда для запуска фронтенда и бэкенда в режиме dev параллельно
CMD ["concurrently", "cd frontend && yarn dev", "cd backend && yarn start"]
