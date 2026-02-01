// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ScholarshipPlatform {
    struct Student {
        uint256 id;
        string name;
        string documentHash; // IPFS or other storage hash
        address wallet;
        bool isRegistered;
    }

    struct Scholarship {
        uint256 id;
        address donor;
        string title;
        uint256 totalAmount;
        uint256 fundedAmount;
        address assignedStudent;
        bool active;
        bool fulfilled;
    }

    mapping(address => Student) public students;
    mapping(uint256 => Scholarship) public scholarships;
    
    uint256 public nextStudentId = 1;
    uint256 public nextScholarshipId = 1;

    // Events
    event StudentRegistered(uint256 indexed id, address indexed wallet, string name);
    event ScholarshipCreated(uint256 indexed id, address indexed donor, string title, uint256 amount);
    event DonationReceived(uint256 indexed id, address indexed donor, uint256 amount);
    event ScholarshipAssigned(uint256 indexed id, address indexed student);
    event FundsReleased(uint256 indexed id, address indexed student, uint256 amount);

    // Modifiers
    modifier onlyRegisteredStudent() {
        require(students[msg.sender].isRegistered, "User is not a registered student");
        _;
    }

    modifier onlyDonor(uint256 _scholarshipId) {
        require(scholarships[_scholarshipId].donor == msg.sender, "Only the donor can perform this action");
        _;
    }

    // --- Student Functions ---

    function registerStudent(string memory _name, string memory _documentHash) external {
        require(!students[msg.sender].isRegistered, "Student already registered");
        require(bytes(_name).length > 0, "Name is required");
        require(bytes(_documentHash).length > 0, "Document hash is required");

        students[msg.sender] = Student({
            id: nextStudentId,
            name: _name,
            documentHash: _documentHash,
            wallet: msg.sender,
            isRegistered: true
        });

        emit StudentRegistered(nextStudentId, msg.sender, _name);
        nextStudentId++;
    }

    // --- Donor Functions ---

    function createScholarship(string memory _title, uint256 _amount) external payable {
        require(bytes(_title).length > 0, "Title is required");
        require(_amount > 0, "Amount must be greater than 0");
        // Check if initial funding is provided (optional, but good for MVP)
        // For now, we allow creating with 0 funded and adding later, or funding immediately.
        // Let's assume the amount passed is the GOAL, and msg.value is the initial contribution.

        scholarships[nextScholarshipId] = Scholarship({
            id: nextScholarshipId,
            donor: msg.sender,
            title: _title,
            totalAmount: _amount,
            fundedAmount: msg.value,
            assignedStudent: address(0),
            active: true,
            fulfilled: false
        });

        emit ScholarshipCreated(nextScholarshipId, msg.sender, _title, _amount);
        
        if (msg.value > 0) {
            emit DonationReceived(nextScholarshipId, msg.sender, msg.value);
        }

        nextScholarshipId++;
    }

    function donate(uint256 _scholarshipId) external payable {
        Scholarship storage scholarship = scholarships[_scholarshipId];
        require(scholarship.active, "Scholarship is not active");
        require(msg.value > 0, "Donation amount must be greater than 0");

        scholarship.fundedAmount += msg.value;
        emit DonationReceived(_scholarshipId, msg.sender, msg.value);
    }

    // --- Core Logic ---

    // Assign a scholarship to a student (by Donor)
    function assignScholarship(uint256 _scholarshipId, address _student) external onlyDonor(_scholarshipId) {
        require(students[_student].isRegistered, "Student is not registered");
        require(scholarships[_scholarshipId].assignedStudent == address(0), "Scholarship already assigned");
        require(!scholarships[_scholarshipId].fulfilled, "Scholarship already fulfilled");

        scholarships[_scholarshipId].assignedStudent = _student;
        emit ScholarshipAssigned(_scholarshipId, _student);
    }

    // Release funds to the student (By Donor or trusted Verifier - for MVP, Donor controls release)
    // In a real automated system, this would be a smart contract oracle or DAO vote.
    function releaseFunds(uint256 _scholarshipId) external onlyDonor(_scholarshipId) {
        Scholarship storage scholarship = scholarships[_scholarshipId];
        
        require(scholarship.assignedStudent != address(0), "No student assigned");
        require(scholarship.fundedAmount > 0, "No funds to release");
        require(!scholarship.fulfilled, "Scholarship already fulfilled");

        uint256 amountToTransfer = scholarship.fundedAmount;
        address payable studentWallet = payable(scholarship.assignedStudent);

        // Update state before transfer to prevent reentrancy
        scholarship.fulfilled = true;
        scholarship.active = false;
        scholarship.fundedAmount = 0; // Reset funded amount as it's being transferred

        (bool success, ) = studentWallet.call{value: amountToTransfer}("");
        require(success, "Transfer failed");

        emit FundsReleased(_scholarshipId, studentWallet, amountToTransfer);
    }

    // Function to check scholarship details
    function getScholarship(uint256 _id) external view returns (Scholarship memory) {
        return scholarships[_id];
    }
}
