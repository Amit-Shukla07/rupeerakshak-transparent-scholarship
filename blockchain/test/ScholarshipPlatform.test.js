const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ScholarshipPlatform", function () {
    let ScholarshipPlatform;
    let scholarshipPlatform;
    let owner, donor, student, otherAccount;

    beforeEach(async function () {
        [owner, donor, student, otherAccount] = await ethers.getSigners();
        ScholarshipPlatform = await ethers.getContractFactory("ScholarshipPlatform");
        scholarshipPlatform = await ScholarshipPlatform.deploy();
    });

    describe("Student Registration", function () {
        it("Should register a student successfully", async function () {
            await scholarshipPlatform.connect(student).registerStudent("Alice", "QmHash123");
            const studentData = await scholarshipPlatform.students(student.address);

            expect(studentData.name).to.equal("Alice");
            expect(studentData.documentHash).to.equal("QmHash123");
            expect(studentData.isRegistered).to.equal(true);
        });

        it("Should fail if student is already registered", async function () {
            await scholarshipPlatform.connect(student).registerStudent("Alice", "QmHash123");
            await expect(
                scholarshipPlatform.connect(student).registerStudent("Alice", "QmHash123")
            ).to.be.revertedWith("Student already registered");
        });
    });

    describe("Scholarship Creation & Donation", function () {
        it("Should create a scholarship", async function () {
            const amount = ethers.parseEther("1.0");
            await scholarshipPlatform.connect(donor).createScholarship("Engineering Fund", amount, { value: amount });

            const scholarship = await scholarshipPlatform.scholarships(1);
            expect(scholarship.title).to.equal("Engineering Fund");
            expect(scholarship.totalAmount).to.equal(amount);
            expect(scholarship.fundedAmount).to.equal(amount);
            expect(scholarship.donor).to.equal(donor.address);
        });

        it("Should accept donations", async function () {
            const goal = ethers.parseEther("2.0");
            await scholarshipPlatform.connect(donor).createScholarship("Medical Fund", goal); // 0 initial funding

            const donation = ethers.parseEther("0.5");
            await scholarshipPlatform.connect(otherAccount).donate(1, { value: donation });

            const scholarship = await scholarshipPlatform.scholarships(1);
            expect(scholarship.fundedAmount).to.equal(donation);
        });
    });

    describe("Fund Release", function () {

        beforeEach(async function () {
            // Register student
            await scholarshipPlatform.connect(student).registerStudent("Bob", "QmHash456");
            // Create scholarship
            const amount = ethers.parseEther("1.0");
            await scholarshipPlatform.connect(donor).createScholarship("Tech Grant", amount, { value: amount });
        });

        it("Should allow donor to assign a student", async function () {
            await scholarshipPlatform.connect(donor).assignScholarship(1, student.address);
            const scholarship = await scholarshipPlatform.scholarships(1);
            expect(scholarship.assignedStudent).to.equal(student.address);
        });

        it("Should release funds to assigned student", async function () {
            await scholarshipPlatform.connect(donor).assignScholarship(1, student.address);

            const initialBalance = await ethers.provider.getBalance(student.address);

            const amount = ethers.parseEther("1.0");
            await scholarshipPlatform.connect(donor).releaseFunds(1);

            const finalBalance = await ethers.provider.getBalance(student.address);
            expect(finalBalance).to.equal(initialBalance + amount);

            const scholarship = await scholarshipPlatform.scholarships(1);
            expect(scholarship.fulfilled).to.equal(true);
            expect(scholarship.active).to.equal(false);
        });

        it("Should fail if non-donor tries to release funds", async function () {
            await scholarshipPlatform.connect(donor).assignScholarship(1, student.address);
            await expect(
                scholarshipPlatform.connect(otherAccount).releaseFunds(1)
            ).to.be.revertedWith("Only the donor can perform this action");
        });
    });
});
