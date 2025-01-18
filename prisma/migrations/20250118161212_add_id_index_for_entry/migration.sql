-- DropIndex
DROP INDEX "SentimentEntry_userId_idx";

-- CreateIndex
CREATE INDEX "SentimentEntry_userId_id_idx" ON "SentimentEntry"("userId", "id");
