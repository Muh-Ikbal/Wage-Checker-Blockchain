// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WageRecorder {
    struct Wage {
        string workerId;
        string name;
        uint256 amount;
        string date;
        address reporter;
        uint256 timestamp;
    }

    Wage[] private wages;
    address public owner;
    mapping(address => bool) public authorized;
    mapping(string => bool) private recordedWorkerIds;
    // Tambahkan ini di dalam kontrak (gantikan recordedWorkerIds yang lama)
    mapping(string => mapping(string => bool)) private recordedWages;

    
    event WageRecorded(string workerId,string name, uint256 amount, string date, address reporter, uint256 timestamp);
    event AuthorizedAdded(address indexed mandor);
    event AuthorizedRemoved(address indexed mandor);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyAuthorized() {
        require(authorized[msg.sender], "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
        authorized[owner] = true;
    }

    function addAuthorized(address mandor) public onlyOwner {
        authorized[mandor] = true;
        emit AuthorizedAdded(mandor);
    }

    function removeAuthorized(address mandor) public onlyOwner {
        authorized[mandor] = false;
        emit AuthorizedRemoved(mandor);
    }

    function logWage(string memory workerId, string memory name, uint256 amount, string memory date) public onlyAuthorized {
        require(!recordedWages[workerId][date], "Wage for this worker on this date already recorded");

        Wage memory newWage = Wage({
            workerId: workerId,
            name : name,
            amount: amount,
            date: date,
            reporter: msg.sender,
            timestamp: block.timestamp
        });

        wages.push(newWage);
        recordedWages[workerId][date] = true;

        emit WageRecorded(workerId, name, amount, date, msg.sender, block.timestamp);
    }


    function getWagesCount() public view returns (uint256) {
        return wages.length;
    }

    function getWage(uint256 index) public view returns (
        string memory workerId,
        string memory name,
        uint256 amount,
        string memory date,
        address reporter,
        uint256 timestamp
    ) {
        require(index < wages.length, "Index out of range");
        Wage memory wage = wages[index];
        return (
            wage.workerId,
            wage.name,
            wage.amount,
            wage.date,
            wage.reporter,
            wage.timestamp
        );
    }
}
