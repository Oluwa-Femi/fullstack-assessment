// based on UI specification, generating random transaction categories
const categories = [
  'shopping',
  'foodanddrinks',
  'transportation',
  'housing',
  'entertainment',
];

class TransactionHelpers {
  static generateCategory() {
    return categories[Math.floor(Math.random() * categories.length)];
  }
}

export default TransactionHelpers;
