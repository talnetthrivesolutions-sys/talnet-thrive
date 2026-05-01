-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'HR_MANAGER', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "SubscriptionTier" AS ENUM ('STARTER', 'PROFESSIONAL', 'ENTERPRISE', 'ENTERPRISE_PLUS');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('DRAFT', 'OPEN', 'ON_HOLD', 'CLOSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('APPLIED', 'SCREENING', 'SHORTLISTED', 'INTERVIEW', 'OFFER_SENT', 'OFFER_ACCEPTED', 'HIRED', 'REJECTED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "InterviewType" AS ENUM ('PHONE_SCREEN', 'APTITUDE_TEST', 'TECHNICAL_ROUND', 'HR_ROUND', 'PANEL_INTERVIEW', 'FINAL_ROUND');

-- CreateEnum
CREATE TYPE "InterviewOutcome" AS ENUM ('PENDING', 'PASSED', 'FAILED', 'NO_SHOW', 'RESCHEDULED');

-- CreateEnum
CREATE TYPE "LabourCode" AS ENUM ('WAGES', 'INDUSTRIAL_RELATIONS', 'SOCIAL_SECURITY', 'OSH');

-- CreateEnum
CREATE TYPE "ComplianceStatus" AS ENUM ('COMPLIANT', 'NON_COMPLIANT', 'UNDER_REVIEW', 'REMEDIATION_IN_PROGRESS', 'NOT_APPLICABLE');

-- CreateEnum
CREATE TYPE "NATSStatus" AS ENUM ('REGISTERED', 'ACTIVE', 'COMPLETED', 'DROPPED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AIQueryType" AS ENUM ('DASHBOARD_QUERY', 'HIRING_RECOMMENDATION', 'PAYROLL_ANALYTICS', 'COMPLIANCE_CHECK', 'WORKFORCE_PREDICTION', 'DIGITAL_TWIN_SIMULATION', 'AUTOMATION_TRIGGER', 'REPORT_GENERATION');

-- CreateEnum
CREATE TYPE "ProfessionalTaxState" AS ENUM ('ANDHRA_PRADESH', 'GUJARAT', 'KARNATAKA', 'KERALA', 'MADHYA_PRADESH', 'MAHARASHTRA', 'ODISHA', 'TAMIL_NADU', 'TELANGANA', 'WEST_BENGAL', 'OTHER');

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "azureTenantId" TEXT NOT NULL,
    "logoUrl" TEXT,
    "industry" TEXT,
    "headcount" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "subscriptionTier" "SubscriptionTier" NOT NULL DEFAULT 'ENTERPRISE',
    "dataRegion" TEXT NOT NULL DEFAULT 'IN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "azureAdSub" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatarUrl" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'EMPLOYEE',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "companyId" TEXT NOT NULL,
    "departmentId" TEXT,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "location" TEXT,
    "isRemote" BOOLEAN NOT NULL DEFAULT false,
    "minSalary" DECIMAL(15,2),
    "maxSalary" DECIMAL(15,2),
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "openings" INTEGER NOT NULL DEFAULT 1,
    "status" "JobStatus" NOT NULL DEFAULT 'DRAFT',
    "closingDate" TIMESTAMP(3),
    "companyId" TEXT NOT NULL,
    "departmentId" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "resumeUrl" TEXT,
    "linkedInUrl" TEXT,
    "portfolioUrl" TEXT,
    "skills" TEXT[],
    "totalExperience" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currentSalary" DECIMAL(15,2),
    "expectedSalary" DECIMAL(15,2),
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "currentLocation" TEXT,
    "noticePeriod" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CandidateProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'APPLIED',
    "coverLetter" TEXT,
    "aiScore" DOUBLE PRECISION,
    "aiInsights" JSONB,
    "referralCode" TEXT,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "interviewerId" TEXT NOT NULL,
    "type" "InterviewType" NOT NULL,
    "outcome" "InterviewOutcome" NOT NULL DEFAULT 'PENDING',
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "durationMinutes" INTEGER NOT NULL DEFAULT 60,
    "meetingLink" TEXT,
    "notes" TEXT,
    "scorecard" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalaryStructure" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "effectiveFrom" TIMESTAMP(3) NOT NULL,
    "effectiveTo" TIMESTAMP(3),
    "grossCTC" DECIMAL(15,2) NOT NULL,
    "basicSalary" DECIMAL(15,2) NOT NULL,
    "hra" DECIMAL(15,2) NOT NULL,
    "specialAllowance" DECIMAL(15,2) NOT NULL,
    "lta" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "medicalAllowance" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "performanceBonus" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "totalDeductions" DECIMAL(15,2) NOT NULL,
    "netSalary" DECIMAL(15,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalaryStructure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PFContribution" (
    "id" TEXT NOT NULL,
    "salaryStructureId" TEXT NOT NULL,
    "employeeUAN" TEXT,
    "employeeEPF" DECIMAL(15,2) NOT NULL,
    "employerEPF" DECIMAL(15,2) NOT NULL,
    "employerEPS" DECIMAL(15,2) NOT NULL,
    "employerEDLI" DECIMAL(15,2) NOT NULL,
    "adminCharges" DECIMAL(10,2) NOT NULL,
    "totalMonthly" DECIMAL(15,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PFContribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ESIContribution" (
    "id" TEXT NOT NULL,
    "salaryStructureId" TEXT NOT NULL,
    "esicInsuranceNo" TEXT,
    "isEligible" BOOLEAN NOT NULL DEFAULT true,
    "employeeESI" DECIMAL(10,2) NOT NULL,
    "employerESI" DECIMAL(10,2) NOT NULL,
    "totalMonthly" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ESIContribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalTax" (
    "id" TEXT NOT NULL,
    "salaryStructureId" TEXT NOT NULL,
    "state" "ProfessionalTaxState" NOT NULL,
    "monthlyDeduction" DECIMAL(8,2) NOT NULL,
    "annualDeduction" DECIMAL(10,2) NOT NULL,
    "ptRegistrationNo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfessionalTax_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabourCodeCompliance" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "code" "LabourCode" NOT NULL,
    "status" "ComplianceStatus" NOT NULL DEFAULT 'UNDER_REVIEW',
    "registrationNo" TEXT,
    "lastAuditDate" TIMESTAMP(3),
    "nextAuditDate" TIMESTAMP(3),
    "auditScore" DOUBLE PRECISION,
    "findings" TEXT,
    "correctiveActions" TEXT,
    "attachmentUrls" TEXT[],
    "reviewedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabourCodeCompliance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NATSApprenticeship" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "apprenticeName" TEXT NOT NULL,
    "apprenticeRefNo" TEXT NOT NULL,
    "trade" TEXT NOT NULL,
    "establishmentId" TEXT,
    "status" "NATSStatus" NOT NULL DEFAULT 'REGISTERED',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "stipend" DECIMAL(10,2),
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "contractUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NATSApprenticeship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIAuditLog" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT,
    "queryType" "AIQueryType" NOT NULL,
    "prompt" TEXT NOT NULL,
    "response" JSONB,
    "modelId" TEXT NOT NULL DEFAULT 'claude-sonnet-4-6',
    "inputTokens" INTEGER,
    "outputTokens" INTEGER,
    "totalTokens" INTEGER,
    "latencyMs" INTEGER,
    "confidence" DOUBLE PRECISION,
    "tags" TEXT[],
    "metadata" JSONB,
    "isDigitalTwin" BOOLEAN NOT NULL DEFAULT false,
    "triggeredAction" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AIAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_domain_key" ON "Company"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "Company_azureTenantId_key" ON "Company"("azureTenantId");

-- CreateIndex
CREATE INDEX "Company_azureTenantId_idx" ON "Company"("azureTenantId");

-- CreateIndex
CREATE INDEX "Company_domain_idx" ON "Company"("domain");

-- CreateIndex
CREATE INDEX "Company_isActive_idx" ON "Company"("isActive");

-- CreateIndex
CREATE INDEX "Department_companyId_idx" ON "Department"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Department_companyId_name_key" ON "Department"("companyId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "User_azureAdSub_key" ON "User"("azureAdSub");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_companyId_role_idx" ON "User"("companyId", "role");

-- CreateIndex
CREATE INDEX "User_companyId_isActive_idx" ON "User"("companyId", "isActive");

-- CreateIndex
CREATE INDEX "User_azureAdSub_idx" ON "User"("azureAdSub");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "Job_companyId_status_idx" ON "Job"("companyId", "status");

-- CreateIndex
CREATE INDEX "Job_companyId_closingDate_idx" ON "Job"("companyId", "closingDate");

-- CreateIndex
CREATE INDEX "Job_createdById_idx" ON "Job"("createdById");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateProfile_userId_key" ON "CandidateProfile"("userId");

-- CreateIndex
CREATE INDEX "CandidateProfile_userId_idx" ON "CandidateProfile"("userId");

-- CreateIndex
CREATE INDEX "Application_jobId_status_idx" ON "Application"("jobId", "status");

-- CreateIndex
CREATE INDEX "Application_candidateId_status_idx" ON "Application"("candidateId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Application_jobId_candidateId_key" ON "Application"("jobId", "candidateId");

-- CreateIndex
CREATE INDEX "Interview_applicationId_type_idx" ON "Interview"("applicationId", "type");

-- CreateIndex
CREATE INDEX "Interview_interviewerId_scheduledAt_idx" ON "Interview"("interviewerId", "scheduledAt");

-- CreateIndex
CREATE UNIQUE INDEX "SalaryStructure_userId_key" ON "SalaryStructure"("userId");

-- CreateIndex
CREATE INDEX "SalaryStructure_companyId_idx" ON "SalaryStructure"("companyId");

-- CreateIndex
CREATE INDEX "SalaryStructure_userId_effectiveFrom_idx" ON "SalaryStructure"("userId", "effectiveFrom");

-- CreateIndex
CREATE UNIQUE INDEX "PFContribution_salaryStructureId_key" ON "PFContribution"("salaryStructureId");

-- CreateIndex
CREATE INDEX "PFContribution_employeeUAN_idx" ON "PFContribution"("employeeUAN");

-- CreateIndex
CREATE UNIQUE INDEX "ESIContribution_salaryStructureId_key" ON "ESIContribution"("salaryStructureId");

-- CreateIndex
CREATE INDEX "ESIContribution_esicInsuranceNo_idx" ON "ESIContribution"("esicInsuranceNo");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalTax_salaryStructureId_key" ON "ProfessionalTax"("salaryStructureId");

-- CreateIndex
CREATE INDEX "LabourCodeCompliance_companyId_status_idx" ON "LabourCodeCompliance"("companyId", "status");

-- CreateIndex
CREATE INDEX "LabourCodeCompliance_nextAuditDate_idx" ON "LabourCodeCompliance"("nextAuditDate");

-- CreateIndex
CREATE UNIQUE INDEX "LabourCodeCompliance_companyId_code_key" ON "LabourCodeCompliance"("companyId", "code");

-- CreateIndex
CREATE INDEX "NATSApprenticeship_companyId_status_idx" ON "NATSApprenticeship"("companyId", "status");

-- CreateIndex
CREATE INDEX "NATSApprenticeship_apprenticeRefNo_idx" ON "NATSApprenticeship"("apprenticeRefNo");

-- CreateIndex
CREATE INDEX "AIAuditLog_companyId_queryType_createdAt_idx" ON "AIAuditLog"("companyId", "queryType", "createdAt");

-- CreateIndex
CREATE INDEX "AIAuditLog_companyId_createdAt_idx" ON "AIAuditLog"("companyId", "createdAt");

-- CreateIndex
CREATE INDEX "AIAuditLog_userId_createdAt_idx" ON "AIAuditLog"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "AIAuditLog_sessionId_idx" ON "AIAuditLog"("sessionId");

-- CreateIndex
CREATE INDEX "AIAuditLog_isDigitalTwin_createdAt_idx" ON "AIAuditLog"("isDigitalTwin", "createdAt");

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateProfile" ADD CONSTRAINT "CandidateProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_interviewerId_fkey" FOREIGN KEY ("interviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalaryStructure" ADD CONSTRAINT "SalaryStructure_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalaryStructure" ADD CONSTRAINT "SalaryStructure_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PFContribution" ADD CONSTRAINT "PFContribution_salaryStructureId_fkey" FOREIGN KEY ("salaryStructureId") REFERENCES "SalaryStructure"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ESIContribution" ADD CONSTRAINT "ESIContribution_salaryStructureId_fkey" FOREIGN KEY ("salaryStructureId") REFERENCES "SalaryStructure"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalTax" ADD CONSTRAINT "ProfessionalTax_salaryStructureId_fkey" FOREIGN KEY ("salaryStructureId") REFERENCES "SalaryStructure"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabourCodeCompliance" ADD CONSTRAINT "LabourCodeCompliance_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NATSApprenticeship" ADD CONSTRAINT "NATSApprenticeship_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIAuditLog" ADD CONSTRAINT "AIAuditLog_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIAuditLog" ADD CONSTRAINT "AIAuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
