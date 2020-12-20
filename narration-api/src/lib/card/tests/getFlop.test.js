const { expect } = require('chai');
const { getFlop } = require('../');

describe('card.getFlop', () => {
  it('should correctly translate 6dKs8c', () => {
    expect(getFlop(17, 47, 24)).to.equal(16508);
  })

  it('should correctly translate Td4c4h', () => {
    expect(getFlop(33, 8, 10)).to.equal(5509);
  })  

  it('should correctly translate 6c3sQh', () => {
    expect(getFlop(16, 7, 42)).to.equal(11607);
  })    
})