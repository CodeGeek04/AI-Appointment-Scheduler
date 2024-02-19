-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "mobile" TEXT NOT NULL,
    "name" TEXT DEFAULT '',
    "address" TEXT DEFAULT '',
    "latitude" DOUBLE PRECISION DEFAULT 0,
    "longitude" DOUBLE PRECISION DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("mobile")
);

-- CreateTable
CREATE TABLE "Clinic" (
    "id" SERIAL NOT NULL,
    "mobile" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "longitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clinic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" TEXT NOT NULL,
    "mobile" TEXT NOT NULL DEFAULT '',
    "message" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointments" (
    "id" TEXT NOT NULL,
    "mobile" TEXT NOT NULL DEFAULT '',
    "clinic" TEXT NOT NULL DEFAULT '',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Post_name_idx" ON "Post"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");
