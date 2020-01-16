import { expect } from 'chai';
import 'mocha';

describe('First test', 
  () => { 
    it('should return true', () => { 
    const isYouAreGood = true;
    expect(isYouAreGood).to.equal(true); 
  }); 
});