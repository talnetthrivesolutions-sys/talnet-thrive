-- CreateEnum
CREATE TYPE "DemoStatus" AS ENUM ('PENDING', 'CONTACTED', 'SCHEDULED', 'COMPLETED', 'DECLINED');

-- CreateTable
CREATE TABLE "DemoRequest" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "service" TEXT,
    "message" TEXT,
    "status" "DemoStatus" NOT NULL DEFAULT 'PENDING',
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DemoRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DemoRequest_seq_key" ON "DemoRequest"("seq");

-- CreateIndex
CREATE INDEX "DemoRequest_status_createdAt_idx" ON "DemoRequest"("status", "createdAt");

-- CreateIndex
CREATE INDEX "DemoRequest_email_idx" ON "DemoRequest"("email");
