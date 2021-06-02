const {hello} = require('./hello');

//arrange
describe('hello', ()=>{
  //act
  it('should return Hello World',()=>{
    //assert
    expect(hello()).toBe('Hello World');
  });
});