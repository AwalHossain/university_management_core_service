-- CreateTable
CREATE TABLE "academic_info" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "totalCompletedCredit" INTEGER DEFAULT 0,
    "cgpa" DOUBLE PRECISION DEFAULT 0,

    CONSTRAINT "academic_info_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "academic_info" ADD CONSTRAINT "academic_info_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
