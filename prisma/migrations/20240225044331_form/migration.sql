-- CreateTable
CREATE TABLE "Form" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "formFields" TEXT[],
    "formResponses" TEXT[],

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
