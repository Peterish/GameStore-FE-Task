// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GameStore {

    struct Product {
        uint id;
        string name;
        uint amount;
    }

    address public owner;
    uint public productCount;
    mapping(uint => Product) public products;
    mapping(uint => address) public buyers;
    mapping(address => uint[]) public userProducts;

    event ProductAdded(uint id, string name, uint amount);
    event ProductBought(uint id, address buyer);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can add products");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addProduct(uint _amount, string memory _name) external onlyOwner {
        productCount++;
        products[productCount] = Product(productCount, _name, _amount);
        emit ProductAdded(productCount, _name, _amount);
    }

    function buyProduct(uint _id, uint _amount) external payable {
        Product storage product = products[_id];
        require(product.id != 0, "Product does not exist");
        require(_amount >= product.amount, "Insufficient funds");

        buyers[_id] = msg.sender;
        userProducts[msg.sender].push(_id);

        emit ProductBought(_id, msg.sender);
    }

    function getUserProducts(address _user) external view returns (uint[] memory) {
        return userProducts[_user];
    }

    function getAllProducts() external view returns (Product[] memory) {
        Product[] memory allProducts = new Product[](productCount);
        for (uint i = 1; i <= productCount; i++) {
            allProducts[i - 1] = products[i];
        }
        return allProducts;
    }

    function withdrawFunds() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
