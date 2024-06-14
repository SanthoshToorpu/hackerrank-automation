-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_problem_key" ON "User"("problem");
