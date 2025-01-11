
set -e

echo "🔍 Checking database connection..."
while ! nc -z postgres 5432; do
  echo "🔄 Waiting for database to be ready..."
  sleep 2
done
echo "✅ Database is ready!"

echo "🔄 Running database migrations..."
npx prisma migrate deploy

if [ "$NODE_ENV" = "development" ]; then
  echo "🚀 Starting development server..."
  npm run dev
else
  echo "🚀 Starting production server..."
  node dist/server.js
fi