#!/bin/sh
set -e

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') $1"
}

wait_for_postgres() {
    log "🔍 Checking database connection..."
    timeout=120
    elapsed=0
    
    until nc -z postgres 5432 || [ $elapsed -eq $timeout ]; do
        log "🔄 Waiting for database to be ready... ($elapsed/$timeout seconds)"
        sleep 2
        elapsed=$((elapsed+2))
    done
    
    if [ $elapsed -eq $timeout ]; then
        log "❌ Database connection timeout after $timeout seconds"
        exit 1
    fi
    
    log "✅ Database is ready!"
}
run_migrations() {
    log "🔄 Running database migrations..."
    if npx prisma migrate deploy; then
        log "✅ Migrations completed successfully"
    else
        log "❌ Migration failed"
        exit 1
    fi
}
main() {
    wait_for_postgres
    run_migrations
    
    if [ "$NODE_ENV" = "development" ]; then
        log "🚀 Starting development server..."
        exec npm run dev
    else
        log "🚀 Starting production server..."
        exec node dist/server.js
    fi
}

trap 'log "⚠️ Received SIGTERM or SIGINT"; exit' TERM INT

main "$@"